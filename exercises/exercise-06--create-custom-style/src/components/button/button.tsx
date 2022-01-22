import styles from './button.module.css'

const Button = () => {
  // ✍️ set the button's className to the class from the CSS module
  return (
    <button className={styles.myButton} type="button">
      Log in
    </button>
  )
}

export default Button
