type SpinnerProps = {
    size?: number;
    color?: 'light' | 'black';
  };
  
  export default function Spinner({ size = 20, color = 'black' }: SpinnerProps) {
    const borderColor = color === 'light' ? 'border-gray-200' : 'border-black';
    const borderLeftColor = color === 'light' ? 'border-gray-300' : 'border-gray-700'; 
  
    return (
      <div
        className={`animate-spin border-t-4 border-solid rounded-full ${borderColor} ${borderLeftColor}`}
        style={{
          width: size,
          height: size,
          borderWidth: size / 10,
        }}
      />
    );
  }
  