import React from "react";
import Styles from "./OptionSelector.module.css";
//this fucntion used when a customer wants to select a different color of a product or different size
function OptionSelector(props) {
  return (
    <div>
      <div className={Styles.optionSelectorBanner}>
        <p>Color</p>
        <span class="material-icons">arrow_drop_down</span>
        {props.colorSelectedError && <p className={Styles.OptionSelectionError}>{props.colorSelectedError.message}</p>}
      </div>

      <div className={Styles.optionSelectorOptions}>
        {props.options.map((option, index) => {
          return (
            <div
              onClick={() => {
                if (
                  typeof props.selectColor !== "undefined" &&
                  typeof props.selectSize !== "undefined"
                ) {
                  props.selectColor(index); //this checks which option is selected
                  // props.selectSize(null); //this checks which size is selected
                }
              }}
              className={
                index === props.selectedColor
                  ? Styles.optionSelected
                  : Styles.optionItem
              }
            >
              <p>{option.color}</p>
            </div>
          );
        })}
      </div>

      <div className={Styles.secondOptionSelectorBanner}>
        <p>Size</p>
        <span class="material-icons">arrow_drop_down</span>
        {props.sizeSelectedError && (
          <p className={Styles.OptionSelectionError}>
            {props.sizeSelectedError.message}
          </p>
        )}
      </div>
      <div className={Styles.optionSelectorOptions}>
        {props.options[props.selectedColor].variants.map((variant, index) => {
          return variant.quantity >= 1 ? (
            <div
              onClick={async () => {
                if (typeof props.selectSize !== "undefined") {
                  props.selectSize(index);
                }
              }}
              className={
                index === props.selectedSize
                  ? Styles.optionSelected
                  : Styles.optionItem
              }
            >
              <p>{"UK " + variant.size}</p>
            </div>
          ) : (
            <div className={Styles.UnavailableOption}>
              <p>{"UK " + variant.size}</p>
            </div>
          ); //code above is used to show which options are available for the certain product
        })}
      </div>
    </div>
  );
}

export default OptionSelector;
