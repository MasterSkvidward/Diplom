import React from "react";
import styles from "./CheckBox.module.scss"; // Стили для CheckBox

const CheckBox = ({ label, checked, onChange }) => {
    return (
        <div
            className={`${styles.customCheckbox} ${checked ? styles.checked : ""}`}
            onClick={onChange}
        >
            <div className={styles.checkboxMark}>
                {checked ? "✓" : ""}
            </div>
            <span className={styles.checkboxLabel}>{label}</span>
        </div>
    );
};

export default CheckBox;
