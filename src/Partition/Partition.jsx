import { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './Partition.css';

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const Partition = ({ id, color, onRemove, width, height }) => {
    const [subPartitions, setSubPartitions] = useState([]);
    const [splitType, setSplitType] = useState(null);

    const handleSplit = (type) => {
        const newColor = getRandomColor();
        setSubPartitions([
            { id: `${id}-1`, color },
            { id: `${id}-2`, color: newColor }
        ]);
        setSplitType(type);
    };

    const handleRemove = (removeId) => {
        setSubPartitions(subPartitions.filter(subPartition => subPartition.id !== removeId));
        if (subPartitions.length === 1) {
            setSplitType(null);
        }
    };

    return (
        <ResizableBox className="partition" width={width} height={height} minConstraints={[100, 100]} maxConstraints={[1200, 1200]}>
            {!splitType ? (
                <div className="partition-content" style={{ backgroundColor: color }}>
                    <div className="controls">
                        <button onClick={() => handleSplit('vertical')}>V</button>
                        <button onClick={() => handleSplit('horizontal')}>H</button>
                        <button onClick={() => onRemove(id)}>remove</button>
                    </div>
                </div>
            ) : (
                <div className={splitType === 'vertical' ? 'vertical-split' : 'horizontal-split'}>
                    {subPartitions.map(subPartition => (
                        <Partition
                            key={subPartition.id}
                            id={subPartition.id}
                            color={subPartition.color}
                            onRemove={handleRemove}
                            width={splitType === 'vertical' ? width / 2 : width}
                            height={splitType === 'horizontal' ? height / 2 : height}
                        />
                    ))}
                </div>
            )}
        </ResizableBox>
    );
};

export default Partition;
