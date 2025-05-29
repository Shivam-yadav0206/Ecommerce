import { useRouter } from "next/navigation";
import { Heart, ShoppingCart } from "lucide-react";

interface Props {
  isAuthenticated: boolean;
  setLoginOpen: (open: boolean) => void;
}

export default function WishlistCartButtons({
  isAuthenticated,
  setLoginOpen,
}: Props) {
  const router = useRouter();

  const handleClick = (path: string) => {
    if (isAuthenticated) {
      router.push(path);
    } else {
      setLoginOpen(true);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <button
        onClick={() => handleClick("/wishlist")}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <Heart className="h-4 w-4 mr-3" />
        Wishlist
      </button>

      <button
        onClick={() => handleClick("/cart")}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <ShoppingCart className="h-4 w-4 mr-3" />
        Cart
      </button>
    </div>
  );
}
