import ScratchCard from './components/ScratchCard';

function App() {
	return (
		<div className="flex justify-center items-center select-none h-screen bg-gradient-to-br from-rose-200 to-fuchsia-200">
			<div className="flex items-center justify-center bg-pattern-snowflake bg-pattern-small w-full h-full">
				<ScratchCard />
			</div>
		</div>
	);
}

export default App;
