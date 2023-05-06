import styles from '@/components/card/card.module.css';
import Image from 'next/image';
import Link from 'next/link';
import cls from 'classnames';

export default function Card(props: {
	name: string;
	imageUrl: string;
	storeLink: string;
}) {
	const { name, imageUrl, storeLink } = props;
	return (
		<Link href={storeLink} className={styles.cardLink}>
			<div className={cls('glass', styles.container)}>
				<div className={styles.cardHeaderWrapper}>
					<h2 className={styles.cardHeader}>{name}</h2>
				</div>
				<div className={styles.cardImageWrapper}>
					<Image
						className={styles.cardImage}
						src={imageUrl}
						width={260}
						height={160}
						alt={name}
					/>
				</div>
			</div>
		</Link>
	);
}
