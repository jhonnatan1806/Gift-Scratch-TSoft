import { useRef, useState, useEffect } from 'react';
import giftImage from '../assets/gift.png';
import { launchConfetti } from '../utils/confetti';
import { Download, Refresh } from './Icons';

const ScratchCard = () => {
	const canvasRef = useRef(null);
	const hiddenImageRef = useRef(null);
	const [isComplete, setIsComplete] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	const [isHovering, setIsHovering] = useState(false);
	const [lastPosition, setLastPosition] = useState(null);

	const width = 400;
	const height = 550;
	const brushSize = 50;

	useEffect(() => {
		// Inicializar fondo gris
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		// Restaurar fondo gris
		ctx.globalCompositeOperation = 'source-over';
		ctx.fillStyle = 'gray';
		ctx.fillRect(0, 0, width, height);
		ctx.globalCompositeOperation = 'destination-out';
		// Mostrar imagen de fondo después de cargar
		setIsLoaded(true);
	}, []);

	const handleScratch = (e) => {
		if (isComplete) return;
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const brushSize = 40;

		if (lastPosition) {
			ctx.beginPath();
			ctx.moveTo(lastPosition.x, lastPosition.y);
			ctx.lineTo(x, y);
			ctx.lineWidth = brushSize;
			ctx.lineCap = 'round';
			ctx.stroke();
		}

		ctx.beginPath();
		ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
		ctx.fill();

		setLastPosition({ x, y });
		checkCompletion();
	};

	const checkCompletion = () => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		const imageData = ctx.getImageData(0, 0, width, height);
		const pixels = imageData.data;
		let transparentPixels = 0;

		for (let i = 3; i < pixels.length; i += 4) {
			if (pixels[i] === 0) transparentPixels++;
		}

		const percentage = (transparentPixels / (pixels.length / 4)) * 100;
		if (percentage > 80) {
			setIsComplete(true);
			launchConfetti();
			ctx.clearRect(0, 0, width, height);
		}
	};

	const handleReset = () => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		// Restaurar fondo gris
		ctx.globalCompositeOperation = 'source-over';
		ctx.fillStyle = 'gray';
		ctx.fillRect(0, 0, width, height);
		ctx.globalCompositeOperation = 'destination-out';
		setIsComplete(false);
	};

	const handleDownload = () => {
		const link = document.createElement('a');
		link.href = giftImage;
		link.download = 'feliz_navidad_Tania.png';
		link.click();
	};

	const handleMouseUp = () => {
		setLastPosition(null);
	};

	const handleMouseMove = (e) => {
		const rect = canvasRef.current.getBoundingClientRect();
		setCursorPosition({
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		});
	};

	return (
		<main className="flex flex-col items-center justify-center h-screen gap-4">
            <div>
                <h1 className="text-4xl font-extrabold bg-gradient-to-bl from-purple-500 to-fuchsia-400 bg-clip-text text-transparent leading-normal text-center">Feliz Navidad Tania</h1>
                <h2 className="text-2xl font-bold  text-fuchsia-400 text-center">¡Rasca y descubre la sorpresa! 🎄</h2>
            </div>
			<div
				className={`relative`}
				style={{ width: `${width}px`, height: `${height}px` }}
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
				onMouseMove={handleMouseMove}>
				<img
					ref={hiddenImageRef}
					src={giftImage}
					alt="Sorpresa"
					className={`absolute object-cover pointer-events-none select-none ${isLoaded ? 'block' : 'hidden'}`}
				/>
				<canvas
					ref={canvasRef}
					width={width}
					height={height}
					className="absolute top-0 left-0 cursor-pointer"
					onMouseDown={(e) => e.buttons === 1 && handleScratch(e)}
					onMouseMove={(e) => e.buttons === 1 && handleScratch(e)}
					onMouseUp={handleMouseUp}></canvas>

				{isHovering && (
					<div
						className="absolute pointer-events-none rounded-full border-4 border-white bg-white opacity-50"
						style={{
							width: `${brushSize}px`,
							height: `${brushSize}px`,
							left: `${cursorPosition.x - 20}px`,
							top: `${cursorPosition.y - 20}px`,
						}}></div>
				)}
			</div>
			<div className='flex justify-center w-full gap-4'>
				<button
					onClick={handleDownload}
					className={`grow flex gap-2 justify-center items-center px-4 py-2 bg-purple-500 text-white rounded ${isComplete ? 'opacity-1' : 'opacity-0'}`}>
					Descargar <Download size={12}/>
				</button>
				<button
					onClick={handleReset}
					className={`grow flex gap-2 justify-center items-center px-4 py-2 bg-gray-500 text-white rounded ${isComplete ? 'opacity-1' : 'opacity-0'}`}>
					Reiniciar <Refresh size={12}/>
				</button>
			</div>
		</main>
	);
};

export default ScratchCard;
