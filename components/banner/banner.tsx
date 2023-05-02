import styles from '@/components/banner/banner.module.css'

const Banner = (props: any) => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>
				<span className={styles.title1}>Coffee</span> 
                <span className={styles.title2}>Connoisseur</span>
			</h1>
			<p className={styles.subTitle}>Discover you local coffe shops!</p>
			<button className={styles.button} onClick={props.handleOnClick}>{props.buttonText}</button>
		</div>
	);
};

export default Banner;
