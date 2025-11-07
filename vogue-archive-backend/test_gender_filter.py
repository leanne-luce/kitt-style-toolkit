"""
Test gender filtering logic locally before deploying
"""

def test_gender_filter(section, gender_preference):
    """Test the filtering logic"""
    section_lower = section.lower()

    if gender_preference == 'womens':
        # Include explicit womenswear
        if 'women' in section_lower or 'womenswear' in section_lower:
            return True  # Include it
        # Exclude explicit menswear
        elif 'menswear' in section_lower or "men's" in section_lower or section_lower.startswith('men '):
            return False  # Exclude it
        # Include neutral/empty sections
        else:
            return True

    elif gender_preference == 'mens':
        # Exclude explicit womenswear first
        if 'women' in section_lower or 'womenswear' in section_lower:
            return False  # Exclude it
        # Include explicit menswear
        elif 'menswear' in section_lower or "men's" in section_lower or section_lower.startswith('men '):
            return True  # Include it
        # Include neutral/empty sections
        else:
            return True

    return True  # Include for 'both' or no preference


# Test cases
test_sections = [
    ("Women's Ready-to-Wear", "womens"),
    ("Menswear", "womens"),
    ("Men's Spring", "womens"),
    ("", "womens"),  # Empty section
    ("Ready-to-Wear", "womens"),  # No gender specified
    ("Womenswear", "womens"),
    ("Men's Ready-to-Wear", "mens"),
    ("Women's Collection", "mens"),
    ("", "mens"),
]

print("Testing gender filter logic:\n")
for section, gender_pref in test_sections:
    result = test_gender_filter(section, gender_pref)
    status = "✓ INCLUDE" if result else "✗ EXCLUDE"
    print(f"{status} | section='{section}' | gender_preference='{gender_pref}'")
