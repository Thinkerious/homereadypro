function Slider({ min, max, step, value, onValueChange }) {
  const handleSliderChange = (e) => {
    onValueChange(e.target.value);
  };

  return (
    <input
      id="steps-range"
      type="range"
      min={min}
      max={max}
      value={value}
      step={step}
      onChange={handleSliderChange}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-8 mb-10"
    />
  );
}

export default Slider;
