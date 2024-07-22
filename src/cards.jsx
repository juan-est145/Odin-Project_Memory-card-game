export default function Cards({ cardList, callBack }) {
	return (
		<div className="cardsContainer">
			{cardList.map((element) => 
				<div key={element.id} className="card" onClick={callBack}>
					<h3>{element.name}</h3>
					<img src={element.img} alt={`Front facing sprite of ${element.name}`} />
				</div>
			)}
		</div>);
}

