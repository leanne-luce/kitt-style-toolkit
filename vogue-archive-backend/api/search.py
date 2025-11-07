"""
Vogue Archive Search Logic
"""
from sentence_transformers import SentenceTransformer
from pinecone import Pinecone
import os

class VogueArchiveSearch:
    def __init__(self, api_key, index_name, environment):
        """Initialize the search engine with CLIP for better fashion understanding"""
        # Using CLIP text encoder for multimodal search (512 dimensions)
        # Using lighter model loading for Render's memory constraints
        self.model = SentenceTransformer('clip-ViT-B-32', device='cpu')
        self.model.max_seq_length = 77  # CLIP's max token length
        self.pc = Pinecone(api_key=api_key)
        self.index = self.pc.Index(index_name)

    def search(self, query, top_k=10, filters=None, gender_preference=None):
        """
        Search the Vogue archive

        Args:
            query (str): Search query
            top_k (int): Number of results to return
            filters (dict): Optional metadata filters
            gender_preference (str): Optional gender preference ('womens', 'mens', 'both')

        Returns:
            list: Search results with metadata
        """
        # Enhance query based on gender preference
        enhanced_query = self._enhance_query_with_gender(query, gender_preference)

        # Generate query embedding
        query_embedding = self.model.encode(enhanced_query).tolist()

        # Build filter query for Pinecone
        pinecone_filter = self._build_filter(filters) if filters else None

        # Fetch more results if filtering by gender (to ensure we have enough after filtering)
        fetch_k = top_k * 3 if gender_preference and gender_preference != 'both' else top_k

        # Search Pinecone
        results = self.index.query(
            vector=query_embedding,
            top_k=fetch_k,
            include_metadata=True,
            filter=pinecone_filter
        )

        # Format and filter results
        formatted_results = []
        for match in results['matches']:
            # Apply gender filtering if specified
            if gender_preference and gender_preference != 'both':
                section = match['metadata'].get('section', '').lower()

                if gender_preference == 'womens':
                    # Include explicit womenswear
                    if 'women' in section or 'womenswear' in section:
                        pass  # Include it
                    # Exclude explicit menswear
                    elif 'menswear' in section or "men's" in section or section.startswith('men '):
                        continue  # Exclude it
                    # Include neutral/empty sections
                    else:
                        pass
                elif gender_preference == 'mens':
                    # Exclude explicit womenswear first
                    if 'women' in section or 'womenswear' in section:
                        continue  # Exclude it
                    # Include explicit menswear
                    elif 'menswear' in section or "men's" in section or section.startswith('men '):
                        pass  # Include it
                    # Include neutral/empty sections
                    else:
                        pass

            formatted_results.append({
                'id': match['id'],
                'score': float(match['score']),
                'metadata': match['metadata']
            })

            # Stop once we have enough results
            if len(formatted_results) >= top_k:
                break

        return formatted_results

    def _enhance_query_with_gender(self, query, gender_preference):
        """Enhance query with gender-specific terms to improve CLIP matching"""
        if not gender_preference or gender_preference == 'both':
            return query

        # Add subtle gender context to help CLIP understand
        if gender_preference == 'womens':
            # CLIP understands these terms for women's fashion
            return f"{query} womenswear"
        elif gender_preference == 'mens':
            # CLIP understands these terms for men's fashion
            return f"{query} menswear"

        return query

    def _build_filter(self, filters):
        """Build Pinecone filter query from filters dict"""
        pinecone_filter = {}

        # Year filters
        if 'year' in filters:
            pinecone_filter['year'] = {'$eq': filters['year']}

        if 'year_range' in filters:
            pinecone_filter['year'] = {
                '$gte': filters['year_range']['min'],
                '$lte': filters['year_range']['max']
            }

        # Designer filter
        if 'designer' in filters:
            pinecone_filter['designer'] = {'$eq': filters['designer']}

        # Category filter (e.g., "Ready-to-Wear", "Couture")
        if 'category' in filters:
            pinecone_filter['category'] = {'$eq': filters['category']}

        # Season filter (e.g., "Spring", "Fall")
        if 'season' in filters:
            pinecone_filter['season'] = {'$eq': filters['season']}

        # City filter (e.g., "Paris", "Milan", "New York")
        if 'city' in filters:
            pinecone_filter['city'] = {'$eq': filters['city']}

        # Aesthetic score filter (minimum quality)
        if 'min_aesthetic' in filters:
            pinecone_filter['aesthetic_score'] = {'$gte': filters['min_aesthetic']}

        return pinecone_filter

    def get_stats(self):
        """Get index statistics"""
        stats = self.index.describe_index_stats()
        return {
            'total_vectors': stats.get('total_vector_count', 0),
            'dimension': stats.get('dimension', 384),
            'index_fullness': stats.get('index_fullness', 0.0)
        }
