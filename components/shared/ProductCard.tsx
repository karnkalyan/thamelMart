
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { Card, CardFooter, CardTitle, CardDescription } from '../ui/Card';
import { formatCurrency, cn } from '../../lib/utils';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { useCartStore } from '../../store/cartStore';
import { useSettingsStore } from '../../store/settingsStore';
import { Volume2, VolumeX } from '../Icons';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore(state => state.addToCart);
  const currency = useSettingsStore(state => state.currency);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Handle video autoplay on hover
  useEffect(() => {
    if (isHovered && videoRef.current && !isPlayingAudio) {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked by browser policy
      });
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered, isPlayingAudio]);

  const toggleAudio = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (audioRef.current) {
      if (isPlayingAudio) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlayingAudio(!isPlayingAudio);
    }
  };

  const hasHoverMedia = !!(product.videoUrl || product.secondaryImage);

  return (
    <Card 
      className="flex flex-col overflow-hidden transition-shadow duration-300 border-stone-300 shadow-none hover:shadow-xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-white">
        {/* Wrap Link around the media area only */}
        <Link to={`/product/${product.id}`} className="block h-full w-full">
          {/* Main Image - Stays visible if audio is playing to keep focus on the product */}
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className={cn(
                "w-full h-full object-cover transition-opacity duration-500 absolute inset-0",
                (isHovered && hasHoverMedia && !isPlayingAudio) ? 'opacity-0' : 'opacity-100'
            )} 
          />
          
          {/* Secondary Image on Hover - Hidden if audio is playing */}
          {product.secondaryImage && !product.videoUrl && (
             <img 
                src={product.secondaryImage} 
                alt={`${product.name} alternate`} 
                className={cn(
                    "w-full h-full object-cover transition-opacity duration-500 absolute inset-0",
                    (isHovered && !isPlayingAudio) ? 'opacity-100' : 'opacity-0'
                )} 
             />
          )}

          {/* Video Preview on Hover - Hidden if audio is playing */}
          {product.videoUrl && (
            <video
              ref={videoRef}
              src={product.videoUrl}
              muted
              loop
              playsInline
              className={cn(
                  "w-full h-full object-cover absolute inset-0 transition-opacity duration-500",
                  (isHovered && !isPlayingAudio) ? 'opacity-100' : 'opacity-0'
              )}
            />
          )}
        </Link>

        {/* Badges - Overlayed on media */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
            {product.tags?.includes('Sold Out') && <Badge variant="destructive">Sold Out</Badge>}
            {product.tags?.includes('Best Seller') && <Badge className="bg-brand-accent text-white">Best Seller</Badge>}
            {product.tags?.includes('New Arrival') && <Badge className="bg-blue-500 text-white">New Arrival</Badge>}
        </div>

        {/* Audio Toggle Button - Moved outside of the Link to prevent nested interactivity bugs */}
        {product.audioUrl && (
          <button
              onClick={toggleAudio}
              className={cn(
                  "absolute bottom-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm text-brand-primary shadow-sm hover:bg-brand-secondary hover:text-white transition-all z-20",
                  isPlayingAudio ? 'ring-2 ring-brand-secondary bg-brand-secondary text-white' : ''
              )}
              title={isPlayingAudio ? 'Stop Preview' : 'Listen to Sound'}
              aria-label="Toggle product audio preview"
          >
              {isPlayingAudio ? <VolumeX className="w-5 h-5 animate-pulse" /> : <Volume2 className="w-5 h-5" />}
              <audio 
                  ref={audioRef} 
                  src={product.audioUrl} 
                  onEnded={() => setIsPlayingAudio(false)} 
              />
          </button>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        {product.brand && <p className="text-xs text-brand-muted uppercase tracking-wider mb-1">{product.brand}</p>}
        <CardTitle className="text-base font-medium h-12">
            <Link to={`/product/${product.id}`} className="hover:text-brand-primary line-clamp-2">{product.name}</Link>
        </CardTitle>
        <CardDescription className="mt-2 text-lg font-semibold text-brand-text">
            {formatCurrency(product.price, currency)}
        </CardDescription>
      </div>
      
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button 
          variant="outline" 
          className="w-full group-hover:bg-brand-primary group-hover:text-white transition-colors"
          onClick={() => addToCart(product)}
          disabled={product.tags?.includes('Sold Out')}
        >
          {product.tags?.includes('Sold Out') ? 'Sold Out' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
