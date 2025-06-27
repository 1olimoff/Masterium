export const RateSvg = ({fill = "#fff", height = 255, width = 255, borderColor, borderWidth}: {fill: string, height: number, width: number, borderColor: string, borderWidth: number}) => {
    return (
    <svg width={width} height={height} viewBox="0 0 34 35" fill={fill} xmlns="http://www.w3.org/2000/svg">
        <path d="M17 1.25415L21.944 11.7862L33 13.4855L25 21.679L26.888 33.2541L17 27.7862L7.112 33.2541L9 21.679L1 13.4855L12.056 11.7862L17 1.25415Z" stroke={borderColor} strokeWidth={borderWidth} stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
)
}