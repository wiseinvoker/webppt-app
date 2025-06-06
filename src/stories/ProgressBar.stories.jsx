import ProgressBar from "../components/ProgressBar";

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  args: {
    slides: new Array(10).fill({}), // Default: 10 slides
    currentSlide: 3,                // Default: Slide 4 of 10 (index 3)
  },
  tags: ['autodocs'],
};

const Template = (args) => <ProgressBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  currentSlide: 3,
};
