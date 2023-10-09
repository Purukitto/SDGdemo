import { useEffect, useState } from "react";
import simpleDungeon from "simpledungeongenerator";
import { generate } from "random-words";
import packageJson from "../package.json";

function App() {
	const [dungeonMap, setdungeonMap] = useState([]);
	// Inputs for dungeon
	const [seed, setSeed] = useState("");
	const [maxHW, setMaxHW] = useState();
	const [result, setResult] = useState(1);
	const [rolling, setRolling] = useState(false);

	const dice = {
		1: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				style={{
					fill: "rgba(254, 245, 245, 1)",
					transform: "",
					msFilter: "",
				}}
			>
				<path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm-7 10.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
			</svg>
		),
		2: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				style={{
					fill: "rgba(254, 245, 245, 1)",
					transform: "",
					msFilter: "",
				}}
			>
				<path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM9.5 13.5a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 9.5 13.5zm5 0a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 14.5 13.5z"></path>
			</svg>
		),
		3: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				style={{
					fill: "rgba(254, 245, 245, 1)",
					transform: "",
					msFilter: "",
				}}
			>
				<path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM8 9.5a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 8 9.5zm4 4a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 12 13.5zm4 4a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 16 17.5z"></path>
			</svg>
		),
		4: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				style={{
					fill: "rgba(254, 245, 245, 1)",
					transform: "",
					msFilter: "",
				}}
			>
				<path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM8 17.5a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 8 17.5zm0-8a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 8 9.5zm8 8a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 16 17.5zm0-8a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 16 9.5z"></path>
			</svg>
		),
		5: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				style={{
					fill: "rgba(254, 245, 245, 1)",
					transform: "",
					msFilter: "",
				}}
			>
				<path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM8 17.5a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 8 17.5zm0-8a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 8 9.5zm4 4a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 12 13.5zm4 4a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 16 17.5zm0-8a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 16 9.5z"></path>
			</svg>
		),
		6: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				style={{
					fill: "rgba(254, 245, 245, 1)",
					transform: "",
					msFilter: "",
				}}
			>
				<path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM8 17.5a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 8 17.5zm0-4a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 8 13.5zm0-4a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 8 9.5zm8 8a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 16 17.5zm0-4a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 16 13.5zm0-4a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 16 9.5z"></path>
			</svg>
		),
	};

	useEffect(() => {
		generateNewDungeon();
	}, []);

	const generateNewDungeon = () => {
		roll();
		const newSeed = generate({
			exactly: 1,
			wordsPerString: 2,
			separator: "-",
		});

		const newMaxHW = generateHeightAndWidth();

		setSeed(newSeed);
		setMaxHW(newMaxHW);

		const dungeon = simpleDungeon({
			seed: newSeed,
			maxH: newMaxHW,
			maxW: newMaxHW,
			extraRoomSize: 2,
		});
		setResult(Math.floor(Math.random() * 6) + 1);
		console.log(dungeon);
		setdungeonMap(dungeon.map);
	};

	const roll = () => {
		setRolling(true);
		setResult(Math.floor(Math.random() * 6) + 1);
		setTimeout(() => {
			setResult(Math.floor(Math.random() * 6) + 1);
		}, 100);
		setTimeout(() => {
			setResult(Math.floor(Math.random() * 6) + 1);
		}, 200);
		setTimeout(() => {
			setResult(Math.floor(Math.random() * 6) + 1);
		}, 300);
		setTimeout(() => {
			setResult(Math.floor(Math.random() * 6) + 1);
		}, 400);
		setTimeout(() => {
			setResult(Math.floor(Math.random() * 6) + 1);
		}, 500);
		setTimeout(() => {
			setResult(Math.floor(Math.random() * 6) + 1);
		}, 600);
		setTimeout(() => {
			setResult(Math.floor(Math.random() * 6) + 1);
			setRolling(false);
		}, 700);
	};

	const generateHeightAndWidth = () => {
		return Math.floor(Math.random() * (50 - 20 + 1) + 20);
	};

	return (
		<div className="bg-black h-screen flex text-white overflow-hidden">
			<div className="m-auto">
				<div className="mb-10">
					<h1 className="text-2xl font-bold text-center space-x-2">
						<a
							className="hover:text-blue-600"
							href="https://github.com/Purukitto/simpleDungeonGenerator"
						>
							simpledungeongenerator
						</a>
						<span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
							{packageJson.dependencies.simpledungeongenerator}
						</span>
					</h1>
				</div>
				{/* Dungeon */}
				<div className="h-[400px] w-[400px] flex flex-col justify-center items-center">
					{dungeonMap.map((row, rowIndex) => (
						<div key={rowIndex} className="flex">
							{row.map((cell, cellIndex) => (
								<span
									key={cellIndex}
									className={`${
										cell === "·"
											? "bg-gray-500" // Path
											: cell === "⛶"
											? "bg-red-300" // Floor
											: cell === "#"
											? "bg-yellow-300" // Door
											: "bg-black" // Wall
									} w-2 h-2`}
								></span>
							))}
						</div>
					))}
				</div>

				{/* Seed */}
				<div className="mt-5 text-center space-y-2">
					<span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">
						{seed}
					</span>
					<span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-indigo-400 border border-indigo-400">
						{maxHW}x{maxHW}
					</span>
				</div>

				{/* Button to generate dungeon */}
				<div className="flex justify-center">
					<button
						className="bg-green-700 hover:bg-green-900 text-white font-bold p-3 rounded-full mt-5 disabled:bg-slate-700 disabled:cursor-not-allowed"
						onClick={generateNewDungeon}
						disabled={rolling}
					>
						{dice[result]}
					</button>
				</div>
				<div className="text-[10px] mt-5 w-[400px]">
					Click on the button above to generate a random dungeon.
					Check the console for the complete dungeon object.
				</div>
			</div>
		</div>
	);
}

export default App;
