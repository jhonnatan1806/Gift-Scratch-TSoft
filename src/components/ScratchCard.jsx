import { useRef, useState, useEffect } from 'react';
import GiftRed from '../assets/gift-red.jpg';
import GiftAnimation from '../assets/gift-animation.gif';
import { launchConfetti } from '../utils/confetti';
import { Download, Refresh } from './Icons';


const Gift = {
    red: GiftRed,
    animation: GiftAnimation
}

const ScratchCard = () => {
	const canvasRef = useRef(null);
	const hiddenImageRef = useRef(null);
	const [isComplete, setIsComplete] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	const [isHovering, setIsHovering] = useState(false);
	const [lastPosition, setLastPosition] = useState(null);
    const [gift, setGift] = useState(Gift.red);

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
            setGift(Gift.animation);
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
        setGift(Gift.red);
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
		<main className="flex flex-col items-center justify-center px-12 py-4 gap-4 rounded-md shadow-md bg-white/90">
            <div>
                <h1 className="text-3xl font-extrabold bg-gradient-to-br from-red-300 to-fuchsia-500 bg-clip-text text-transparent leading-normal text-center">Feliz Navidad Tania</h1>
                <h2 className="text-xl font-bold bg-gradient-to-br from-red-300 to-fuchsia-500 bg-clip-text text-transparent leading-normal text-center">¡Raspa y descubre la sorpresa!</h2>
            </div>
			<div
				className={`relative`}
				style={{ width: `${width}px`, height: `${height}px` }}
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
				onMouseMove={handleMouseMove}>
				<img
					ref={hiddenImageRef}
					src={gift}
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
				<a
					href="https://drive.google.com/drive/folders/1n_rVKBA70iI3Q-FDID2cdFPeCQbjw1f1?usp=sharing"
                    target='_blank'
                    rel='noreferrer noopener'
					className={`grow flex font-medium text-base gap-2 justify-center items-center px-4 py-2 bg-gradient-to-br from-rose-400 to-fuchsia-400 text-white rounded ${isComplete ? 'opacity-1' : 'opacity-0'}`}>
					Descargar <Download size={12}/>
				</a>
				<button
					onClick={handleReset}
					className={`grow flex font-medium text-base gap-2 justify-center items-center px-4 py-2 bg-gradient-to-bl from-slate-500 to-gray-600 text-white rounded ${isComplete ? 'opacity-1' : 'opacity-0'}`}>
					Reiniciar <Refresh size={12}/>
				</button>
			</div>
		</main>
	);
};

export default ScratchCard;
