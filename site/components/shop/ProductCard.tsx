import styles from './ProductCard.module.css';
import ButtonPrimary from "@/components/ui/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "@/components/ui/ButtonSecondary/ButtonSecondary";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  weight: string;
  inStock: boolean;
  storeUrl: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/${product.image}`}
          alt={product.name}
          className={styles.image}
        />
        {!product.inStock && (
          <div className={styles.outOfStock}>Rupture de stock</div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{product.name}</h3>
          <span className={styles.weight}>{product.weight}</span>
        </div>

        <p className={styles.description}>{product.description}</p>

        <div className={styles.footer}>
          <span className={styles.price}>{product.price.toFixed(2)} €</span>
          <a
            href={product.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
            aria-label={`Commander ${product.name}`}
          >
            Commander
          </a>
        </div>
      </div>
    </div>
  );
}

