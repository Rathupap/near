import tw from "twin.macro";

const HorizontalLineWrapper = tw.div`
    border-b border-b-dark-border
    w-full
`;

const HorizontalLine = () => (
    <HorizontalLineWrapper />
);

export default HorizontalLine;