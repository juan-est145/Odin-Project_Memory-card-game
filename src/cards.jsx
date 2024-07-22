export default function Cards({ cardList, callBack }) {
	return (
		<main className="cardsContainer">
			{cardList.map((element) => {
				let name = element.name.charAt(0) + element.name.slice(1).toLowerCase();
				
				return (<div 
				key={element.id} 
				data-name={name} 
				data-sound={element.sound}
				className="card" 
				onClick={callBack}>
					<h3>{element.name}</h3>
					<img 
					src={element.img} 
					alt={`Front facing sprite of ${name}`}/>
				</div>)
			} 	
			)}
		</main>);
}

