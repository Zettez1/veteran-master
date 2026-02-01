import os
import glob

# Map of partial/full names to new names
# Since exact matching fails due to encoding, we will match by iterating directory
mapping = {
    'ВинограднікBlack.glb': 'vineyard_black.glb',
    'ВинограднікGraphit.glb': 'vineyard_graphite.glb',
    'ВинограднікGrey.glb': 'vineyard_grey.glb',
    'Козирьок.glb': 'visor.glb',
    'Навес5на4м.glb': 'carport_5x4.glb',
    'навес односкатныйglb.glb': 'single_slope_carport.glb'
}

files = os.listdir('.')
print(f"Current files: {files}")

for filename in files:
    # Try direct match
    if filename in mapping:
        new_name = mapping[filename]
        try:
            os.rename(filename, new_name)
            print(f"Renamed '{filename}' to '{new_name}'")
        except Exception as e:
            print(f"Error renaming {filename}: {e}")
    else:
        # Try approximate match if encoding is weird (optional, but let's stick to exact first)
        pass
