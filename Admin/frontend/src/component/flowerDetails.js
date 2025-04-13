const Flowerdetails = ({ flower }) => {
    

    return ( 
        <section>
            <div className="flower-detail">
                <h4>{flower.name}</h4>
                <p><strong>Description: </strong>{flower.description}</p>
                <p><strong>Category: </strong>{flower.category}</p>
                <p><strong>Price: </strong>${flower.price}</p>
                <p>{flower.CreatedAt}</p>
    
                
            </div>
        </section>
    );
}

    export default Flowerdetails;