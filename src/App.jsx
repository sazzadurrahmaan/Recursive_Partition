import { useState } from 'react';
import './App.css';
import Partition from './Partition/Partition';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const App = () => {
  const [partitions, setPartitions] = useState([{ id: 'initial', color: getRandomColor(), width: 800, height: 400 }]);

  const handleRemove = (id) => {
    setPartitions(partitions.filter(partition => partition.id !== id));
  };

  return (
    <div className="App">
      {partitions.map(partition => (
        <Partition
          key={partition.id}
          id={partition.id}
          color={partition.color}
          onRemove={handleRemove}
          width={partition.width}
          height={partition.height}
        />
      ))}
    </div>
  );
}

export default App;
