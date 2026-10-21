const fs = require('fs');
const path = require('path');

const cmsPath = path.join(__dirname, '..', 'cms-data.json');
const rawData = fs.readFileSync(cmsPath, 'utf8');
const photos = JSON.parse(rawData);

// Metadata templates per category to give every photo realistic, searchable titles and tags
const categoryMetadata = {
    'Street Photography': [
        { title: 'Tokyo Rainy Night Crossing', tags: ['tokyo', 'rain', 'night', 'street', 'city', 'crosswalk', 'umbrella', 'neon', 'urban', 'japan'] },
        { title: 'Vintage Yellow Taxi in Manhattan', tags: ['taxi', 'cab', 'car', 'manhattan', 'new york', 'city', 'yellow', 'traffic', 'urban', 'street'] },
        { title: 'Subway Station Commute Motion', tags: ['subway', 'train', 'metro', 'commute', 'motion', 'transit', 'underground', 'pedestrian', 'city'] },
        { title: 'Neon Lit Cyberpunk Alleyway', tags: ['neon', 'cyberpunk', 'alley', 'night', 'glow', 'dark', 'lantern', 'building', 'street'] },
        { title: 'Bicycle Leaned Against Brick Wall', tags: ['bicycle', 'bike', 'wall', 'brick', 'vintage', 'shadow', 'morning', 'street', 'cycling'] },
        { title: 'Coffee Shop Window on Wet Afternoon', tags: ['coffee', 'cafe', 'window', 'rain', 'drops', 'afternoon', 'relax', 'street', 'reflection'] },
        { title: 'Urban Skateboarder at Golden Hour', tags: ['skate', 'skateboard', 'golden hour', 'sunset', 'action', 'sport', 'youth', 'street'] },
        { title: 'London Red Phone Booth in Fog', tags: ['london', 'phone booth', 'red', 'fog', 'mist', 'england', 'vintage', 'landmark', 'street'] },
        { title: 'Night Market Steam and Stalls', tags: ['market', 'food', 'night', 'street food', 'steam', 'stalls', 'asia', 'crowd', 'lights'] },
        { title: 'Pedestrians Crossing in Shadows', tags: ['pedestrian', 'walking', 'crosswalk', 'shadows', 'sunlight', 'black and white', 'monochrome', 'street'] },
        { title: 'Classic Vintage Muscle Car on Sunset Strip', tags: ['car', 'vintage', 'classic', 'automobile', 'sunset', 'los angeles', 'vehicle', 'drive'] },
        { title: 'Old Town Cobblestone Street at Dusk', tags: ['cobblestone', 'old town', 'europe', 'dusk', 'evening', 'lantern', 'historic', 'street'] },
        { title: 'Downtown Traffic Light Trails Long Exposure', tags: ['traffic', 'light trails', 'long exposure', 'cars', 'highway', 'speed', 'cityscape', 'night'] },
        { title: 'Bus Stop Waiting in Autumn Rain', tags: ['bus stop', 'bus', 'autumn', 'rain', 'leaves', 'coat', 'cold', 'city', 'waiting'] },
        { title: 'Rooftop View Over Dense City Skyline', tags: ['rooftop', 'skyline', 'skyscraper', 'view', 'height', 'downtown', 'architecture', 'city'] }
    ],
    'Wallpapers': [
        { title: 'Deep Space Nebula and Cosmic Stars', tags: ['space', 'nebula', 'galaxy', 'stars', 'cosmos', 'universe', 'purple', 'wallpaper', '4k', 'dark'] },
        { title: 'Minimalist Gradient Flow Abstract', tags: ['minimalist', 'gradient', 'abstract', 'smooth', 'pastel', 'clean', 'modern', 'wallpaper', 'background'] },
        { title: 'Majestic Snowy Mountain Peak at Twilight', tags: ['mountain', 'snow', 'peaks', 'alps', 'twilight', 'sunset', 'landscape', 'wallpaper', 'winter'] },
        { title: 'Dark Mode Cyber Mesh Geometry', tags: ['dark', 'black', 'mesh', 'geometry', 'dark mode', 'texture', 'sleek', 'wallpaper', 'minimal'] },
        { title: 'Lush Tropical Palm Leaf Close-up', tags: ['palm', 'leaf', 'green', 'tropical', 'botanical', 'nature', 'fresh', 'summer', 'wallpaper'] },
        { title: 'Neon Wave Futuristic Retro Landscape', tags: ['neon', 'synthwave', 'retro', 'futuristic', 'grid', 'purple', 'cyberpunk', 'wallpaper'] },
        { title: 'Calm Turquoise Ocean Water Texture', tags: ['ocean', 'sea', 'water', 'turquoise', 'waves', 'aqua', 'calm', 'beach', 'wallpaper'] },
        { title: 'Golden Hour Sand Dunes Pattern', tags: ['desert', 'sand', 'dunes', 'golden hour', 'sun', 'sahara', 'minimalist', 'wallpaper', 'warm'] },
        { title: 'Floating 3D Prismatic Glass Crystals', tags: ['glass', 'crystals', 'prism', 'reflection', 'refraction', 'rainbow', '3d', 'wallpaper'] },
        { title: 'Misty Pine Forest Aerial View', tags: ['forest', 'pine', 'trees', 'mist', 'fog', 'aerial', 'green', 'drone', 'wallpaper'] },
        { title: 'Aurora Borealis Northern Lights Green Glow', tags: ['aurora', 'northern lights', 'green', 'night', 'sky', 'norway', 'arctic', 'wallpaper'] },
        { title: 'Abstract Fluid Acrylic Paint Waves', tags: ['fluid', 'acrylic', 'paint', 'waves', 'colorful', 'liquid', 'art', 'wallpaper'] },
        { title: 'Clean Architectural Concrete Lines', tags: ['architecture', 'concrete', 'lines', 'minimalist', 'shadows', 'structure', 'wallpaper'] },
        { title: 'Starry Milky Way Over Desert Arch', tags: ['milky way', 'stars', 'night', 'sky', 'astronomy', 'desert', 'rock', 'wallpaper'] },
        { title: 'Soft Sunset Clouds Pastel Palette', tags: ['clouds', 'sunset', 'sky', 'pastel', 'pink', 'soft', 'heaven', 'calm', 'wallpaper'] }
    ],
    'Nature': [
        { title: 'Sunbeams Breaking Through Deep Emerald Forest', tags: ['forest', 'sunbeams', 'trees', 'nature', 'sunlight', 'green', 'morning', 'peaceful', 'woods', 'dog', 'pet', 'hiking'] },
        { title: 'Alpine Glacier Lake with Mirror Reflections', tags: ['lake', 'mountain', 'alps', 'reflection', 'water', 'blue', 'glacier', 'hiking', 'nature'] },
        { title: 'Golden Wheat Field Whispering in Wind', tags: ['wheat', 'field', 'farm', 'golden hour', 'sunlight', 'harvest', 'countryside', 'nature'] },
        { title: 'Crashing Coastline Waves on Black Rocks', tags: ['ocean', 'waves', 'coast', 'sea', 'rocks', 'cliff', 'water', 'surf', 'storm'] },
        { title: 'Blooming Cherry Blossoms in Spring', tags: ['cherry blossom', 'sakura', 'flower', 'flowers', 'bloom', 'spring', 'pink', 'floral', 'japan', 'nature'] },
        { title: 'Mighty Waterfall Cascading Down Canyon', tags: ['waterfall', 'water', 'canyon', 'cascade', 'river', 'iceland', 'power', 'nature'] },
        { title: 'Wild Deer Grazing in Morning Mist', tags: ['deer', 'wildlife', 'animal', 'animals', 'mist', 'morning', 'fog', 'grass', 'nature', 'forest'] },
        { title: 'Vibrant Autumn Leaves Forest Path', tags: ['autumn', 'fall', 'leaves', 'foliage', 'orange', 'red', 'path', 'trees', 'nature'] },
        { title: 'Dolomites Mountain Peaks Sunset Glow', tags: ['mountain', 'dolomites', 'italy', 'peaks', 'sunset', 'alpinism', 'rock', 'nature'] },
        { title: 'Desert Saguaro Cactus Under Starry Sky', tags: ['cactus', 'desert', 'stars', 'arizona', 'southwest', 'night', 'nature', 'sky', 'cat'] },
        { title: 'Tropical Coral Reef Marine Life', tags: ['coral', 'reef', 'ocean', 'underwater', 'fish', 'sea', 'marine', 'scuba', 'nature', 'wildlife'] },
        { title: 'Sunflower Field Facing Golden Sun', tags: ['sunflower', 'flower', 'flowers', 'yellow', 'field', 'sun', 'summer', 'bright', 'nature'] },
        { title: 'Frozen Ice Caves Shimmering Blue', tags: ['ice', 'glacier', 'cave', 'winter', 'frozen', 'blue', 'arctic', 'cold', 'nature', 'snow'] },
        { title: 'Wild Wolf in Snow Covered Pine Wilderness', tags: ['wolf', 'animal', 'wildlife', 'dog', 'canine', 'snow', 'winter', 'forest', 'nature', 'wilderness'] },
        { title: 'Lavender Fields of Provence at Sunset', tags: ['lavender', 'flower', 'flowers', 'purple', 'france', 'field', 'sunset', 'scent', 'nature'] }
    ],
    '3D Renders': [
        { title: 'Futuristic Cyberpunk Hovercraft Landing', tags: ['cyberpunk', 'futuristic', 'sci-fi', 'vehicle', 'hovercraft', 'neon', '3d', 'render', 'city'] },
        { title: 'Iridescent Glass Sphere on Gradient Pedestal', tags: ['glass', 'sphere', 'iridescent', '3d', 'render', 'minimal', 'lighting', 'cgi'] },
        { title: 'Isometric Cozy Smart Studio Apartment', tags: ['isometric', 'room', 'apartment', 'interior', 'cozy', '3d', 'render', 'design', 'blender'] },
        { title: 'Gold and Chrome Liquid Metal Fluidity', tags: ['gold', 'chrome', 'metal', 'liquid', 'fluid', 'abstract', 'luxury', '3d', 'render'] },
        { title: 'Floating Abstract Geometric Polygons', tags: ['geometry', 'shapes', 'polygon', 'abstract', 'floating', 'minimalist', '3d', 'render'] },
        { title: 'Surreal Desert with Levitating Portal Ring', tags: ['portal', 'surreal', 'ring', 'desert', 'glow', 'sci-fi', 'alien', '3d', 'render'] },
        { title: 'Neon Hologram Human Mind Network', tags: ['hologram', 'ai', 'brain', 'network', 'cyber', 'technology', 'neon', 'data', '3d'] },
        { title: 'Matte Clay Architectural Pavilion', tags: ['clay', 'matte', 'architecture', 'pavilion', 'minimalist', 'pastel', '3d', 'render'] },
        { title: 'Bioluminescent Alien Flora Garden', tags: ['bioluminescence', 'alien', 'plants', 'glowing', 'night', 'fantasy', '3d', 'render'] },
        { title: 'Sleek Concept Sports Car Clay Model', tags: ['car', 'concept', 'supercar', 'automobile', 'design', 'clay', 'sleek', '3d', 'render'] },
        { title: 'Infinite Mirror Room Neon Glow Tunnel', tags: ['mirror', 'tunnel', 'neon', 'infinite', 'reflection', 'glow', '3d', 'render'] },
        { title: 'Soft Fabric Simulation Floating Silk', tags: ['fabric', 'cloth', 'silk', 'simulation', 'flowing', 'wind', 'pastel', '3d'] },
        { title: 'Mechanical Robotic Hand with Fiber Optics', tags: ['robot', 'cybernetic', 'hand', 'technology', 'future', 'mechanics', '3d', 'render'] },
        { title: 'Floating Islands with Low Poly Trees', tags: ['low poly', 'island', 'floating', 'clouds', 'fantasy', 'game', '3d', 'render'] },
        { title: 'Cybernetic Skull with Glowing Circuitry', tags: ['skull', 'cyber', 'circuit', 'glow', 'dark', 'sci-fi', '3d', 'render'] }
    ],
    'Textures': [
        { title: 'Rough Aged Oak Wood Grain Texture', tags: ['wood', 'grain', 'oak', 'timber', 'rustic', 'brown', 'natural', 'texture', 'background'] },
        { title: 'White Carrara Marble with Grey Veins', tags: ['marble', 'stone', 'white', 'luxury', 'veins', 'clean', 'countertop', 'texture'] },
        { title: 'Raw Brutalist Concrete Wall Surface', tags: ['concrete', 'cement', 'brutalist', 'grey', 'wall', 'industrial', 'texture', 'stone'] },
        { title: 'Crystal Clear Water Droplets on Glass Pane', tags: ['water', 'droplets', 'drops', 'glass', 'rain', 'condensation', 'macro', 'texture'] },
        { title: 'Vintage Crumpled Brown Kraft Paper', tags: ['paper', 'crumpled', 'parchment', 'kraft', 'vintage', 'old', 'texture', 'beige'] },
        { title: 'Dark Black Brushed Metal Steel Finish', tags: ['metal', 'steel', 'brushed', 'black', 'iron', 'industrial', 'sleek', 'texture'] },
        { title: 'Fine Golden Beach Sand Ripples', tags: ['sand', 'ripples', 'beach', 'desert', 'dunes', 'golden', 'macro', 'texture'] },
        { title: 'Weathered Rust and Peeling Paint on Steel', tags: ['rust', 'paint', 'peeling', 'weathered', 'decay', 'grunge', 'orange', 'texture'] },
        { title: 'Woven Linen Fabric Textile Weave', tags: ['fabric', 'linen', 'cloth', 'textile', 'cotton', 'weave', 'natural', 'texture'] },
        { title: 'Deep Black Carbon Fiber Weave Pattern', tags: ['carbon fiber', 'black', 'pattern', 'composite', 'racing', 'high tech', 'texture'] },
        { title: 'Glossy Emerald Green Ceramic Subway Tiles', tags: ['tile', 'ceramic', 'subway', 'green', 'glossy', 'wall', 'pattern', 'texture'] },
        { title: 'Aged Leather Grain with Patina', tags: ['leather', 'patina', 'brown', 'vintage', 'hide', 'jacket', 'luxury', 'texture'] },
        { title: 'Red Exposed Brick Wall Mortar', tags: ['brick', 'red', 'wall', 'urban', 'masonry', 'rustic', 'loft', 'texture'] },
        { title: 'Cracked Dry Earth Mud Desert Soil', tags: ['cracked', 'mud', 'earth', 'soil', 'drought', 'dry', 'ground', 'texture'] },
        { title: 'Golden Foil Wrinkled Metallic Sheen', tags: ['gold', 'foil', 'metallic', 'wrinkled', 'shiny', 'luxury', 'glamour', 'texture'] }
    ],
    'Travel': [
        { title: 'Eiffel Tower View from Parisian Balcony', tags: ['paris', 'france', 'eiffel tower', 'europe', 'balcony', 'city', 'travel', 'romantic'] },
        { title: 'Santorini White Cliffside Houses and Blue Domes', tags: ['santorini', 'greece', 'blue dome', 'sea', 'mediterranean', 'island', 'travel', 'summer'] },
        { title: 'Backpacker Standing on Norwegian Fjord Cliff', tags: ['fjord', 'norway', 'hiking', 'backpacker', 'cliff', 'trolltunga', 'adventure', 'travel'] },
        { title: 'Traditional Japanese Torii Gate in Kyoto', tags: ['kyoto', 'japan', 'torii gate', 'shrine', 'culture', 'temple', 'travel', 'historic'] },
        { title: 'Vintage Convertible Driving Coastal Highway', tags: ['car', 'road trip', 'convertible', 'highway', 'coast', 'california', 'drive', 'travel'] },
        { title: 'Hot Air Balloons Floating Over Cappadocia', tags: ['cappadocia', 'turkey', 'hot air balloon', 'sunrise', 'sky', 'landscape', 'travel'] },
        { title: 'Venetian Gondola Navigating Grand Canal', tags: ['venice', 'italy', 'gondola', 'canal', 'water', 'historic', 'architecture', 'travel'] },
        { title: 'Airplane Wing Soaring Above Fluffy White Clouds', tags: ['airplane', 'flight', 'wing', 'clouds', 'sky', 'aviation', 'travel', 'wanderlust'] },
        { title: 'Taj Mahal Reflected in Tranquil Pool', tags: ['taj mahal', 'india', 'agra', 'monument', 'landmark', 'marble', 'travel', 'wonder'] },
        { title: 'Campsite Under Starlit Wilderness Sky', tags: ['camping', 'tent', 'campfire', 'stars', 'wilderness', 'outdoor', 'adventure', 'travel'] },
        { title: 'Tropical Palm Beach with Hammock in Maldives', tags: ['maldives', 'beach', 'tropical', 'palm', 'hammock', 'resort', 'vacation', 'travel'] },
        { title: 'New York Times Square Bustle at Night', tags: ['new york', 'times square', 'broadway', 'lights', 'crowd', 'city', 'usa', 'travel'] },
        { title: 'Historic Streetcar Tram in Lisbon Portugal', tags: ['lisbon', 'portugal', 'tram', 'streetcar', 'yellow', 'cobblestone', 'travel'] },
        { title: 'Machu Picchu Ancient Citadel in Andes Mist', tags: ['machu picchu', 'peru', 'inca', 'andes', 'ruins', 'history', 'travel', 'hiking'] },
        { title: 'Passport Map and Camera on Wooden Table', tags: ['passport', 'camera', 'map', 'travel planning', 'adventure', 'flatlay', 'explore', 'travel'] }
    ],
    'Film': [
        { title: '35mm Film Grain Portrait in Golden Sunlight', tags: ['portrait', 'film', '35mm', 'grain', 'golden hour', 'sunlight', 'analog', 'vintage'] },
        { title: 'Retro Gas Station Neon Sign at Night', tags: ['gas station', 'neon', 'retro', 'night', 'america', 'vintage', 'film', 'analog'] },
        { title: 'Vintage Polaroid Camera with Nostalgic Prints', tags: ['polaroid', 'camera', 'film', 'photos', 'analog', 'memories', 'retro', 'vintage'] },
        { title: 'Moody Diner Booth with Cup of Black Coffee', tags: ['diner', 'coffee', 'cup', 'booth', 'moody', 'cinematic', 'vintage', 'film'] },
        { title: 'Suburban Summer Afternoon Kodak Portra Aesthetic', tags: ['suburban', 'summer', 'kodak', 'retro', 'nostalgia', 'sunlight', 'film', 'color'] },
        { title: 'Classic Vinyl Record Spinning on Turntable', tags: ['vinyl', 'record', 'turntable', 'music', 'sound', 'retro', 'analog', 'vintage', 'film'] },
        { title: 'Drive-in Movie Theater Screen Under Dusky Sky', tags: ['drive-in', 'movie', 'cinema', 'cars', 'dusk', 'vintage', 'screen', 'film'] },
        { title: 'Light Leak Flare on Vintage Muscle Car Hood', tags: ['light leak', 'car', 'flare', 'vintage', 'film grain', 'retro', 'drive'] },
        { title: 'Train Window Rain Streaks Cinematic View', tags: ['train', 'window', 'rain', 'travel', 'cinematic', 'melancholy', 'film', 'moody'] },
        { title: 'Old Motel Neon Sign Buzzing in Fog', tags: ['motel', 'neon', 'fog', 'night', 'route 66', 'vintage', 'sign', 'film'] },
        { title: 'Girl with Headphones Listening on Cassette Player', tags: ['headphones', 'cassette', 'girl', 'music', 'walkman', '80s', 'retro', 'film'] },
        { title: 'Skatepark Bowl in Warm 90s Film Colors', tags: ['skateboard', 'skatepark', '90s', 'retro', 'action', 'warm', 'film', 'youth'] },
        { title: 'Analog Film Negatives Hanging in Darkroom', tags: ['darkroom', 'negatives', 'film', 'photography', 'analog', 'red light', 'processing'] },
        { title: 'Laundromat Fluorescent Glow Late Night', tags: ['laundromat', 'neon', 'night', 'urban', 'cinematic', 'aesthetic', 'film'] },
        { title: 'Vintage Sunglasses on Retro Convertible Dashboard', tags: ['sunglasses', 'dashboard', 'convertible', 'road trip', 'summer', 'vintage', 'film'] }
    ],
    'People': [
        { title: 'Smiling Young Woman with Curly Hair in Sunlight', tags: ['woman', 'smile', 'portrait', 'sunlight', 'curly hair', 'happy', 'lifestyle', 'people'] },
        { title: 'Elderly Artisan Crafting Leather by Hand', tags: ['artisan', 'craft', 'leather', 'hands', 'work', 'elderly', 'maker', 'portrait', 'people'] },
        { title: 'Friends Laughing Around Rooftop Campfire', tags: ['friends', 'laughing', 'campfire', 'group', 'happiness', 'night', 'gathering', 'people'] },
        { title: 'Urban Street Musician Playing Acoustic Guitar', tags: ['musician', 'guitar', 'music', 'busker', 'street', 'singer', 'artist', 'people'] },
        { title: 'Athlete Sprinting on Track in Morning Fog', tags: ['athlete', 'runner', 'running', 'sport', 'fitness', 'track', 'workout', 'people'] },
        { title: 'Confident Man in Modern Business Suit', tags: ['man', 'businessman', 'suit', 'portrait', 'professional', 'office', 'career', 'people'] },
        { title: 'Young Artist Painting Colorful Canvas in Studio', tags: ['artist', 'painter', 'painting', 'studio', 'art', 'creative', 'palette', 'people'] },
        { title: 'Barista Pouring Latte Art in Specialty Coffee Shop', tags: ['barista', 'coffee', 'latte art', 'cafe', 'espresso', 'hands', 'craft', 'people'] },
        { title: 'Fashion Model in Avant-Garde High Fashion Coat', tags: ['model', 'fashion', 'high fashion', 'style', 'editorial', 'portrait', 'people'] },
        { title: 'Father Carrying Little Daughter on Shoulders', tags: ['father', 'family', 'daughter', 'child', 'love', 'parenting', 'park', 'people'] },
        { title: 'Chef Plating Gourmet Dish in Restaurant Kitchen', tags: ['chef', 'kitchen', 'cooking', 'food', 'restaurant', 'gourmet', 'culinary', 'people'] },
        { title: 'Woman Practicing Yoga Pose on Sunrise Beach', tags: ['yoga', 'meditation', 'wellness', 'beach', 'sunrise', 'fitness', 'peace', 'people'] },
        { title: 'Architect Reviewing Blueprints on Tablet', tags: ['architect', 'blueprints', 'design', 'construction', 'tablet', 'tech', 'work', 'people'] },
        { title: 'Diverse Team Brainstorming in Modern Office', tags: ['team', 'coworkers', 'office', 'startup', 'meeting', 'collaboration', 'business', 'people'] },
        { title: 'Hiker Celebrating at Mountaintop Summit', tags: ['hiker', 'mountain', 'summit', 'celebration', 'success', 'outdoor', 'adventure', 'people'] }
    ],
    'Architecture and Interior': [
        { title: 'Modern Minimalist Glass Villa Living Room', tags: ['interior', 'living room', 'villa', 'minimalist', 'modern', 'glass', 'sofa', 'architecture'] },
        { title: 'Spiral Concrete Staircase Looking Down', tags: ['stairs', 'staircase', 'spiral', 'concrete', 'geometry', 'curves', 'architecture'] },
        { title: 'Brutalist Concrete Skyscraper Facade', tags: ['brutalist', 'skyscraper', 'concrete', 'facade', 'building', 'geometric', 'architecture'] },
        { title: 'Scandinavian Cozy Bedroom with Large Window', tags: ['bedroom', 'scandinavian', 'cozy', 'bed', 'window', 'interior', 'hygge', 'decor'] },
        { title: 'Futuristic Curved Museum White Architecture', tags: ['museum', 'curved', 'white', 'futuristic', 'modern art', 'minimal', 'architecture'] },
        { title: 'Modern Kitchen with Marble Island and Pendant Lights', tags: ['kitchen', 'marble', 'countertop', 'lights', 'modern', 'interior', 'home', 'design'] },
        { title: 'Historic Gothic Cathedral Arch and Stained Glass', tags: ['cathedral', 'church', 'gothic', 'stained glass', 'arch', 'historic', 'architecture'] },
        { title: 'Sunlit Home Office Desk with Plants and Laptop', tags: ['home office', 'desk', 'workspace', 'laptop', 'plants', 'interior', 'work', 'setup'] },
        { title: 'Industrial Loft with Exposed Brick and High Ceilings', tags: ['loft', 'industrial', 'brick', 'ceiling', 'windows', 'urban', 'interior'] },
        { title: 'Sleek Infinity Pool on Cliffside Modern Terrace', tags: ['pool', 'infinity pool', 'terrace', 'luxury', 'cliff', 'resort', 'architecture'] },
        { title: 'Geometric Wooden Slat Acoustic Wall Feature', tags: ['wood', 'slats', 'geometric', 'interior', 'panel', 'acoustic', 'design', 'architecture'] },
        { title: 'Symmetrical Modern Glass Skyscraper Reflection', tags: ['skyscraper', 'glass', 'reflection', 'symmetry', 'blue', 'city', 'architecture'] },
        { title: 'Luxury Minimalist Bathroom with Freestanding Tub', tags: ['bathroom', 'tub', 'luxury', 'marble', 'minimalist', 'spa', 'interior'] },
        { title: 'Dramatic Arched Courtyard in Moorish Palace', tags: ['palace', 'arches', 'courtyard', 'columns', 'morocco', 'spain', 'architecture'] },
        { title: 'Cozy Library with Floor-to-Ceiling Bookshelves', tags: ['library', 'books', 'bookshelf', 'reading', 'cozy', 'wood', 'study', 'interior'] }
    ],
    'Experimental': [
        { title: 'Iridescent Prismatic Light Spectrum Dispersion', tags: ['prism', 'rainbow', 'spectrum', 'light', 'iridescent', 'glass', 'refraction', 'experimental'] },
        { title: 'Vibrant Swirling Liquid Pigment Macro Abstract', tags: ['liquid', 'pigment', 'macro', 'swirl', 'fluid', 'ink', 'abstract', 'experimental'] },
        { title: 'Cybernetic Glitch Art Digital Distortion Wave', tags: ['glitch', 'digital', 'distortion', 'cyber', 'wave', 'rgb', 'screen', 'experimental'] },
        { title: 'Long Exposure Light Painting Ribbons in Dark', tags: ['light painting', 'long exposure', 'ribbon', 'glow', 'night', 'motion', 'experimental'] },
        { title: 'Microscopic Soap Bubble Colorful Interference Films', tags: ['bubble', 'soap', 'macro', 'microscopic', 'iridescent', 'colors', 'experimental'] },
        { title: 'Surreal Floating Liquid Chrome Droplets', tags: ['chrome', 'liquid', 'droplets', 'mercury', 'silver', 'surreal', '3d', 'experimental'] },
        { title: 'Smoke Tendrils Illuminated by Dual Color Gel', tags: ['smoke', 'colored light', 'gel', 'wisps', 'mysterious', 'abstract', 'experimental'] },
        { title: 'Thermal Inverted Heat Vision Color Distortion', tags: ['thermal', 'heat', 'invert', 'infrared', 'colors', 'neon', 'experimental'] },
        { title: 'Geometric Laser Light Projection in Atmospheric Haze', tags: ['laser', 'projection', 'haze', 'beams', 'light show', 'geometry', 'experimental'] },
        { title: 'Ferrofluid Magnetic Spike Sculpture Under Light', tags: ['ferrofluid', 'magnetic', 'spikes', 'black', 'liquid', 'science', 'experimental'] },
        { title: 'Abstract Holographic Gradient Mesh Blur', tags: ['holographic', 'gradient', 'mesh', 'blur', 'abstract', 'colors', 'experimental'] },
        { title: 'Exploding Neon Powder Pigment Cloud in Strobe', tags: ['powder', 'explosion', 'neon', 'pigment', 'burst', 'motion', 'experimental'] },
        { title: 'Polarized Crystal Formations Through Cross Polarization', tags: ['crystal', 'polarized', 'geology', 'macro', 'psychedelic', 'colors', 'experimental'] },
        { title: 'Kinetic Motion Blur of City Night Lights', tags: ['motion blur', 'kinetic', 'speed', 'lights', 'night', 'abstract', 'experimental'] },
        { title: 'Deep Space Fractal Pattern Recursion', tags: ['fractal', 'math', 'recursion', 'infinite', 'pattern', 'cosmic', 'experimental'] }
    ]
};

// Counters per category
const categoryCounts = {};

const enrichedPhotos = photos.map((photo, index) => {
    const cat = photo.category;
    const catIdx = categoryCounts[cat] || 0;
    categoryCounts[cat] = catIdx + 1;

    const metaList = categoryMetadata[cat] || [];
    const meta = metaList[catIdx % metaList.length] || {
        title: `${cat} ${catIdx + 1}`,
        tags: [cat.toLowerCase(), 'photo', 'art', 'unsplash']
    };

    // Construct enriched photo item
    return {
        id: `photo-${index + 1}`,
        title: meta.title,
        alt: `${meta.title} - ${cat}`,
        tags: [...new Set([cat.toLowerCase(), ...meta.tags])],
        imgSrc: photo.imgSrc,
        author: photo.author,
        category: photo.category,
        description: `High-resolution ${meta.title} captured by ${photo.author.name}.`
    };
});

fs.writeFileSync(cmsPath, JSON.stringify(enrichedPhotos, null, 2), 'utf8');
console.log(`Successfully enriched ${enrichedPhotos.length} photos in cms-data.json`);

// Also generate cms-data.js as an offline/file:// resilient fallback
const jsDataPath = path.join(__dirname, '..', 'cms-data.js');
const jsContent = `// Fallback CMS dataset for offline or file:// protocol viewing\nwindow.CMS_DATA = ${JSON.stringify(enrichedPhotos, null, 2)};\n`;
fs.writeFileSync(jsDataPath, jsContent, 'utf8');
console.log(`Successfully created cms-data.js fallback bundle`);
