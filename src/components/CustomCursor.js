const CustomCursor = ({ size = 40, opacity = 0.25 }) => {
    const cursorUrl = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'><circle cx='${size / 2}' cy='${size / 2}' r='${
        size / 2 - 5
    }' fill='rgba(255,255,255,${opacity})'/></svg>`;

    return `url(${cursorUrl}), auto`;
};

export default CustomCursor;
