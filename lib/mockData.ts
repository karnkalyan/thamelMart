
import type { Product, Category, Testimonial, BlogPost, TrustedByItem, Review } from '../types';

const mockReviews: Review[] = [
  {
    id: 'rev1',
    userName: 'David Miller',
    rating: 5,
    date: 'Jan 12, 2024',
    comment: 'The resonance is incredible. It truly helps me get into a deeper meditative state. Worth every penny!',
    isVerified: true
  },
  {
    id: 'rev2',
    userName: 'Sarah Jenkins',
    rating: 4,
    date: 'Dec 05, 2023',
    comment: 'Beautiful craftsmanship. The sound is clear, although it took a little practice to get the technique right.',
    isVerified: true
  },
  {
    id: 'rev3',
    userName: 'Aarav Sharma',
    rating: 5,
    date: 'Feb 14, 2024',
    comment: 'Authentic quality from Nepal. I bought this as a gift and they absolutely loved it.',
    isVerified: true
  }
];

export const categories: Category[] = [
  { id: 'cat1', name: 'Singing Bowls', slug: 'singing-bowls', image: 'https://www.himalayanbazaar.com/cdn/shop/files/Large-Tibetan-Singing-Bowl-Set-Handmade-Healing-Yoga-Meditation-Sound-Bath-Kundalini-Himalayan-Bazaar-48873170.jpg' },
  { id: 'cat2', name: 'Bells & Tingshas', slug: 'bells-tingshas', image: 'https://www.himalayanbazaar.com/cdn/shop/files/Ashtamangala-HIMALAYAN-BAZAAR-48898558.jpg' },
  { id: 'cat3', name: 'Prayer Flags', slug: 'prayer-flags', image: 'https://www.himalayanbazaar.com/cdn/shop/files/Prayer-Flags-Blank-Set-of-10-Five-Tibetan-Colors-_-Yellow_-White_-Blue_-Green_-Red-for-Arts-Crafts-Decoration-by-Himalayan-Bazaar-Himalayan-Bazaar-48883561.jpg' },
];

export const products: Product[] = [
  {
    id: 'prod1',
    name: '12-Inch Handmade Tibetan Singing Bowl Set',
    brand: 'Thamel Mart',
    price: 800.00,
    description: 'Transform your meditation and healing practice with our 12-Inch Handmade Kundalini Tibetan Singing Bowl Set. This master healing grade bowl is meticulously crafted from seven metals, producing deep, resonant tones that promote relaxation, chakra balancing, and spiritual well-being.',
    images: ['https://www.himalayanbazaar.com/cdn/shop/files/Large-Tibetan-Singing-Bowl-Set-Handmade-Healing-Yoga-Meditation-Sound-Bath-Kundalini-Himalayan-Bazaar-48873170.jpg', 'https://www.himalayanbazaar.com/cdn/shop/files/Large-Tibetan-Singing-Bowl-Set-Handmade-Healing-Yoga-Meditation-Sound-Bath-Kundalini-Himalayan-Bazaar-48873255.jpg'],
    secondaryImage: 'https://www.himalayanbazaar.com/cdn/shop/files/Large-Tibetan-Singing-Bowl-Set-Handmade-Healing-Yoga-Meditation-Sound-Bath-Kundalini-Himalayan-Bazaar-48873255.jpg',
    videoUrl: 'https://videos.pexels.com/video-files/3752834/3752834-uhd_2560_1440_25fps.mp4',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    category: 'singing-bowls',
    tags: ['Best Seller'],
    specs: { material: 'Seven Metal Alloy', weight: '2.5kg', size: '12 inch' },
    whyYoullLoveIt: ['Master healing grade for deep resonance.', 'Promotes relaxation and chakra balancing.', 'Handmade by skilled artisans in Nepal.'],
    includes: ['1 x 12" Singing Bowl', '1 x Mallet', '1 x Silk Cushion'],
    reviews: mockReviews
  },
  {
    id: 'prod2',
    name: '7 Chakra Bowl Set',
    brand: 'Thamel Mart',
    price: 135.80,
    description: 'A complete set of seven singing bowls, each tuned to a specific chakra. This jumbo pack is perfect for sound therapy, meditation, and aligning your energy centers.',
    images: ['https://www.himalayanbazaar.com/cdn/shop/files/7-Chakra-Bowl-Set-Himalayan-Bazaar-48878450.jpg', 'https://www.himalayanbazaar.com/cdn/shop/files/7-Chakra-Bowl-Set-Himalayan-Bazaar-48878513.jpg'],
    secondaryImage: 'https://www.himalayanbazaar.com/cdn/shop/files/7-Chakra-Bowl-Set-Himalayan-Bazaar-48878513.jpg',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    category: 'singing-bowls',
    tags: ['Popular'],
    specs: { material: 'Brass Alloy', weight: '4kg total', size: 'Varies per bowl' },
    whyYoullLoveIt: ['Aligns all seven chakras.', 'Complete set for healing practices.', 'Beautifully crafted and decorated.'],
    includes: ['7 x Chakra Singing Bowls', '7 x Mallets', '7 x Cushions'],
    reviews: [mockReviews[0], mockReviews[2]]
  },
  {
    id: 'prod3',
    name: 'Ashtamangala Bell and Dorje Set',
    brand: 'Thamel Mart',
    price: 160.00,
    description: 'An antique Bell and Dorje (Vajra) set, representing the union of wisdom (bell) and compassion (dorje). These are essential ritual items in Tibetan Buddhism, beautifully decorated with the eight auspicious symbols (Ashtamangala).',
    images: ['https://www.himalayanbazaar.com/cdn/shop/files/Ashtamangala-HIMALAYAN-BAZAAR-48898558.jpg', 'https://www.himalayanbazaar.com/cdn/shop/files/Ashtamangala-HIMALAYAN-BAZAAR-48898653.jpg'],
    category: 'bells-tingshas',
    tags: ['New Arrival'],
    specs: { material: 'Bronze', weight: '800g', size: '18cm x 9cm' },
    whyYoullLoveIt: ['Authentic ritual instrument.', 'Represents core Buddhist principles.', 'Intricately decorated with auspicious symbols.'],
    includes: ['1 x Bell', '1 x Dorje (Vajra)'],
    reviews: [mockReviews[1]]
  },
  {
    id: 'prod4',
    name: 'Blank Tibetan Prayer Flags',
    brand: 'Thamel Mart',
    price: 35.00,
    description: 'A set of 10 blank prayer flags in the five traditional Tibetan colors: Yellow, White, Blue, Green, and Red. Perfect for your own arts, crafts, messages, or decorations, ready to be hung to spread peace and compassion.',
    images: ['https://www.himalayanbazaar.com/cdn/shop/files/Prayer-Flags-Blank-Set-of-10-Five-Tibetan-Colors-_-Yellow_-White_-Blue_-Green_-Red-for-Arts-Crafts-Decoration-by-Himalayan-Bazaar-Himalayan-Bazaar-48883561.jpg', 'https://www.himalayanbazaar.com/cdn/shop/files/Prayer-Flags-Blank-Set-of-10-Five-Tibetan-Colors-_-Yellow_-White_-Blue_-Green_-Red-for-Arts-Crafts-Decoration-by-Himalayan-Bazaar-Himalayan-Bazaar-48883636.jpg'],
    category: 'prayer-flags',
    specs: { material: 'Cotton', weight: '100g', size: '17cm x 18cm per flag' },
    whyYoullLoveIt: ['Customize with your own messages.', 'Traditional five-color sequence.', 'Ideal for creative and spiritual expression.'],
    includes: ['1 x String of 10 Blank Prayer Flags']
  },
  {
    id: 'prod5',
    name: 'Dragon Tingsha Bells',
    brand: 'Thamel Mart',
    price: 60.00,
    description: 'These Tingsha cymbals are easy to play and produce a clear, high-pitched tone perfect for meditation, mindfulness, and clearing energy. Handcrafted in Tibet, they are embossed with a powerful dragon motif.',
    images: ['https://www.himalayanbazaar.com/cdn/shop/files/Dragon-Tingsha-Bells-Himalayan-Bazaar-48881476.jpg', 'https://www.himalayanbazaar.com/cdn/shop/files/Dragon-Tingsha-Bells-Himalayan-Bazaar-48881566.jpg'],
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    category: 'bells-tingshas',
    tags: ['Popular'],
    specs: { material: 'Bronze Alloy', weight: '250g', size: '6.5cm diameter' },
    whyYoullLoveIt: ['Clear, ringing tone for focus.', 'Embossed with a beautiful dragon design.', 'Perfect for space clearing and meditation.'],
    includes: ['1 x Pair of Tingsha Bells']
  },
   {
    id: 'prod6',
    name: '9-Inch Tibetan Antique Singing Bowl Set',
    brand: 'Thamel Mart',
    price: 336.00,
    description: 'Immerse yourself in the soothing sounds of the Tibetan Antique Singing Bowl Set, a 9-inch handcrafted masterpiece. Ideal for yoga, meditation, and sound baths, this bowl produces a rich, deep vibration that resonates with healing energy.',
    images: ['https://www.himalayanbazaar.com/cdn/shop/files/Large-Tibetan-Singing-Bowl-Set-Healing-Yoga-Sound-Bath-Meditation-9-_-Mystic-Himalayan-Bazaar-USA-48867656.jpg', 'https://www.himalayanbazaar.com/cdn/shop/files/Large-Tibetan-Singing-Bowl-Set-Healing-Yoga-Sound-Bath-Meditation-9-_-Mystic-Himalayan-Bazaar-USA-48867989.jpg'],
    videoUrl: 'https://videos.pexels.com/video-files/8202568/8202568-uhd_2560_1440_25fps.mp4',
    category: 'singing-bowls',
    tags: ['Limited Stock'],
    specs: { material: 'Hand-hammered Bronze', weight: '1.8kg', size: '9 inch' },
    whyYoullLoveIt: ['Deep, long-lasting resonance.', 'Authentic antique finish.', 'Excellent for professional sound healing.'],
    includes: ['1 x 9" Singing Bowl', '1 x Mallet', '1 x Silk Cushion']
  },
  {
    id: 'prod7',
    name: 'Flower of Life Singing Bowl',
    brand: 'Thamel Mart',
    price: 30.79,
    description: 'This beautiful singing bowl is etched with the Flower of Life, a sacred geometric symbol of creation and the unity of everything. Its harmonious tones are perfect for meditation and spiritual connection.',
    images: ['https://www.himalayanbazaar.com/cdn/shop/files/Flower-of-Life-Bowl-Himalayan-Bazaar-48864297.jpg', 'https://www.himalayanbazaar.com/cdn/shop/files/Flower-of-Life-Bowl-Himalayan-Bazaar-48864362.jpg'],
    category: 'singing-bowls',
    tags: ['Best Seller'],
    specs: { material: 'Etched Brass', weight: '400g', size: '4 inch' },
    whyYoullLoveIt: ['Sacred Flower of Life etching.', 'Creates a harmonious atmosphere.', 'Compact and beautifully decorative.'],
    includes: ['1 x 4" Singing Bowl', '1 x Mallet', '1 x Cushion']
  },
  {
    id: 'prod8',
    name: 'Karma Vibe Tibetan Singing Bowl',
    brand: 'Thamel Mart',
    price: 120.97,
    description: 'A master-grade healing bowl made from 7 metals. This 7.5-inch bronze bowl has a "Karma Vibe" that is perfect for sound baths, chakra balancing, and deep meditation. Its vibrations are both powerful and soothing.',
    images: ['https://www.himalayanbazaar.com/cdn/shop/files/Large-Tibetan-Singing-Bowl-Set-Master-Grade-Healing-Chakra-Sound-Bath-Meditation-Yoga-7-Metal-Bronze-Himalayan-Bazaar-USA-48868177.jpg', 'https://www.himalayanbazaar.com/cdn/shop/files/Large-Tibetan-Singing-Bowl-Set-Master-Grade-Healing-Chakra-Sound-Bath-Meditation-Yoga-7-Metal-Bronze-Himalayan-Bazaar-USA-48868474.jpg'],
    category: 'singing-bowls',
    tags: ['Best Seller'],
    specs: { material: '7-Metal Bronze', weight: '1.2kg', size: '7.5 inch' },
    whyYoullLoveIt: ['Powerful healing vibrations.', 'Master-grade quality.', 'Ideal for professional and personal use.'],
    includes: ['1 x 7.5" Singing Bowl', '1 x Professional Mallet', '1 x Silk Cushion']
  },
  {
    id: 'prod9',
    name: 'Eternity Knot Bowl',
    brand: 'Thamel Mart',
    price: 34.36,
    description: 'This singing bowl features the Eternity Knot, one of the eight auspicious symbols, representing the interconnectedness of all things and the endless cycle of life. A meaningful tool for contemplation and meditation.',
    images: ['https://www.himalayanbazaar.com/cdn/shop/files/Eternity-Knot-Bowl-Himalayan-Bazaar-48863499.jpg', 'https://www.himalayanbazaar.com/cdn/shop/files/Eternity-Knot-Bowl-Himalayan-Bazaar-48863578.jpg'],
    category: 'singing-bowls',
    tags: ['New Arrival'],
    specs: { material: 'Etched Brass', weight: '450g', size: '4 inch' },
    whyYoullLoveIt: ['Symbolizes interconnectedness.', 'Aids in contemplative practice.', 'Hand-etched with care.'],
    includes: ['1 x 4" Singing Bowl', '1 x Mallet', '1 x Cushion']
  },
  {
    id: 'prod10',
    name: 'Buddha Footprint Singing Bowl',
    brand: 'Thamel Mart',
    price: 43.00,
    description: 'Embody the sacred path with this unique singing bowl, featuring the footprint of the Buddha. A beautiful piece that serves as a reminder of the path to enlightenment.',
    images: ['https://www.himalayanbazaar.com/cdn/shop/files/aa.jpg?v=1737712396', 'https://www.himalayanbazaar.com/cdn/shop/files/bb.jpg?v=1737712444'],
    category: 'singing-bowls',
    specs: { material: 'Etched Brass', weight: '500g', size: '10cm' },
    whyYoullLoveIt: ['Unique Buddha footprint design.', 'Inspires mindfulness and devotion.', 'Perfect for personal altar or sacred space.'],
    includes: ['1 x Singing Bowl', '1 x Mallet', '1 x Cushion']
  },
  {
    id: 'prod11',
    name: 'Blue Throat Chakra Singing Bowl',
    brand: 'Thamel Mart',
    price: 35.00,
    description: 'This blue singing bowl is specially designed to resonate with the Throat Chakra (Vishuddha), promoting clear communication and self-expression. It features a serene Buddha Eyes design.',
    images: ['https://www.himalayanbazaar.com/cdn/shop/files/Singing-Bowl-43-Himalayan-Bazaar-140888084.jpg', 'https://www.himalayanbazaar.com/cdn/shop/files/Singing-Bowl-43-Himalayan-Bazaar-140888284.jpg'],
    category: 'singing-bowls',
    tags: ['New Arrival'],
    specs: { material: 'Colored Metal Alloy', weight: '400g', size: '4 inch' },
    whyYoullLoveIt: ['Tuned for the Throat Chakra.', 'Promotes communication and expression.', 'Vibrant color with Buddha Eyes design.'],
    includes: ['1 x 4" Singing Bowl', '1 x Mallet', '1 x Cushion']
  },
  {
    id: 'prod12',
    name: 'Horizontal Windhorse Prayer Flags',
    brand: 'Thamel Mart',
    price: 25.00,
    description: 'Traditional Tibetan prayer flags featuring the Windhorse (Lung Ta), a symbol of speed and the transformation of bad fortune to good fortune. Hang them to spread blessings and positive energy on the wind.',
    images: ['https://www.himalayanbazaar.com/cdn/shop/products/Traditionalwindhorseprayerflag.jpg?v=1626292350', 'https://www.himalayanbazaar.com/cdn/shop/products/Traditionalwindhorseprayerflag_1.jpg?v=1626292350'],
    category: 'prayer-flags',
    tags: ['Best Seller'],
    specs: { material: 'Cotton', weight: '150g', size: '25ft string length' },
    whyYoullLoveIt: ['Carries blessings on the wind.', 'Symbolizes good fortune and success.', 'Authentic Tibetan design.'],
    includes: ['1 x String of Horizontal Prayer Flags']
  }
];

// Added 'id' property to each testimonial to match the Testimonial interface
export const testimonials: Testimonial[] = [
    { id: 't1', name: 'Alex J.', quote: 'The sound quality is incredible and the craftsmanship is stunning! It arrived beautifully packaged with a personal note, which was a lovely touch.' },
    { id: 't2', name: 'Priya N.', quote: 'This singing bowl is a work of art. It has such a beautiful, clear tone that is so easy to create. It has become a centerpiece of my daily mindfulness practice.' },
    { id: 't3', name: 'Elena R.', quote: 'Even more beautiful in person. The sound is so pure and calming it easily helps me tune out distractions. My husband loves using it too!' },
    { id: 't4', name: 'Sam K.', quote: 'The quality of everything from the bowl to the cushion exceeded my expectations. The craftsmanship is top-notch. Five stars for sure, I highly recommend Thamel Mart.' },
];

export const blogPosts: BlogPost[] = [
    { id: 'blog1', title: 'The Best Free Yoga on YouTube: 4 Flows to Try This Week', date: 'April 15, 2023', excerpt: 'This morning flow is perfect if you wake up sore or want to get more morning movement but aren’t a morning exerciser...', image: 'https://www.silentmindsingingbowls.com/cdn/shop/articles/4_Flows_to_Try_This_Week.jpg?v=1681545618&width=800' },
    { id: 'blog2', title: 'The Ultimate Guide to the At-Home Sound Bath', date: 'April 09, 2023', excerpt: 'Sit and meditate on this for a minute, taking full, even breaths. Now begin to play, going between singing bowls...', image: 'https://www.silentmindsingingbowls.com/cdn/shop/articles/The_Ultimate_Guide_to_the_At-Home_Sound_Bath_2.jpg?v=1681029819&width=800' },
    { id: 'blog3', title: 'Body, Mind, Soul: 7 Mindfulness Benefits Everyone Deserves', date: 'April 03, 2023', excerpt: 'If we want to use mindfulness for a specific aim, such as relaxation or creativity, we can support the practice with tools...', image: 'https://www.silentmindsingingbowls.com/cdn/shop/articles/7_Mindfulness_Benefits_Everyone_Deserves.jpg?v=1680510214&width=800' },
    { id: 'blog4', title: 'Relaxation Breathing Exercises: A Beginner’s Guide', date: 'March 30, 2023', excerpt: 'Today, let’s focus solely on breathing for relaxation. We’ll answer common questions about relaxation breathing exercises...', image: 'https://www.silentmindsingingbowls.com/cdn/shop/articles/A_Beginner_s_Guide_to_Relaxation_Breathing_Exercises.jpg?v=1680164239&width=800' },
];

export const trustedByItems: TrustedByItem[] = [
    { name: 'Those Seeking Calm', image: 'https://www.silentmindsingingbowls.com/cdn/shop/files/seekingcalm_1.jpg?v=1746594678' },
    { name: 'Meditation Experts', image: 'https://www.silentmindsingingbowls.com/cdn/shop/files/meditation_experts_1.jpg?v=1746594678' },
    { name: 'Yoga Practitioners', image: 'https://www.silentmindsingingbowls.com/cdn/shop/files/yoga_1.jpg?v=1746594957' },
    { name: 'Reiki Practitioners', image: 'https://www.silentmindsingingbowls.com/cdn/shop/files/reiki_1.jpg?v=1746594678' },
    { name: 'Sound Therapists', image: 'https://www.silentmindsingingbowls.com/cdn/shop/files/soundtherapist_1.jpg?v=1746594678' },
];
