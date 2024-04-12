import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

	const [pets, setPets] = useState([]);
	const loadPets = async () => {
		const response = await fetch('/pets');
		const data = await response.json();
		return data;
	};

	useEffect(() => {
		loadPets().then((pets) => {
			setPets(pets);
		});
	}, []);

	// dragstart ->  drag ->  dragend

	/**
	 * This event handler will be called only when drag started
	 * @param event - event object
	 */
	const handleOnDragStart = (event: React.DragEvent<HTMLLIElement>): void => {
		console.log('handleOnDragStart');
		const target = event.target as HTMLLIElement;
		event.dataTransfer.clearData();
		event.dataTransfer.setData("text", target.id);
		event.dataTransfer.effectAllowed = "move";
		target.classList.add("dragging");
	};

	/**
	 * This event handler is called when dragable element is dragged after dragstart event
	 * @param event - event object 
	 */
	const handleOnDrag = (event: React.DragEvent<HTMLLIElement>): void => {
		event.preventDefault();
		console.log('handleOnDrag');
	};


	const handleOnDragEnd = (event: React.DragEvent<HTMLLIElement>): void => {
		console.log('handleOnDragEnd');
		(event.target as HTMLLIElement).classList.remove("dragging");
	};

	// dragover -> dragenter -> (dragleave) -> drop

	const handleOnDragOver = (event: React.DragEvent<HTMLElement>): void => {
		console.log('handleOnDragOver');
		event.preventDefault();
		event.stopPropagation();
		event.dataTransfer.dropEffect = "move";
	};

	const handleOnDragEnter = (event: React.DragEvent<HTMLElement>): void => {
		console.log('handleOnDragEnter');
		const target = event.target as HTMLElement;
		target.classList.add('highlight');
	};

	const handleOnDragLeave =(event: React.DragEvent<HTMLElement>): void => {
		console.log('handleOnDragLeave');
		const target = event.target as HTMLElement;
		target.classList.remove('highlight');
	};


	const handleOnDrop = (event: React.DragEvent<HTMLElement>): void => {
		console.log('handleOnDrop');
		const eleId = event.dataTransfer.getData("text");
		const target = event.target as HTMLElement;
		target.appendChild(document.getElementById(eleId) as HTMLLIElement);
		target.classList.remove('highlight');
	};

	return (
		<div className='app'>
			<header className='header'>
				<h1>Drag & Drop Demo</h1>
			</header>
			<section className='dnd-zone'>
				<aside id='source' className='source'>
					<ul className='list'>
						{pets.map((pet) => (
							<li
								draggable
								id={pet}
								key={pet}
								onDrag={handleOnDrag}
								onDragStart={handleOnDragStart}
								onDragEnd={handleOnDragEnd}
							>
								{pet}
							</li>
						))}
					</ul>
				</aside>
				<aside
					id='target'
					className='target'
					onDragOver={handleOnDragOver}
					onDragEnter={handleOnDragEnter}
					onDragLeave={handleOnDragLeave}
					onDrop={handleOnDrop}
				></aside>
			</section>
		</div>
	);
}

export default App;
