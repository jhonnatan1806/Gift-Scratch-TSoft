import ScratchCard from './components/ScratchCard';

function App() {
	return (
		<div className="flex justify-center items-center select-none min-h-screen bg-gradient-to-br from-rose-200 to-fuchsia-200">
			<div className="flex items-center justify-center bg-pattern-snowflake bg-pattern-small w-full min-h-screen">
                <div className='p-4 flex flex-col items-center'>
                    <ScratchCard />
                </div>
			</div>
		</div>
	);
}

export default App;
