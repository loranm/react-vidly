import React, {Component} from 'react';

const Listgroup = (props) => {
    const {genres, onItemSelect, id, textProperty, selectedGenre} = props
    return (
        <React.Fragment>
            <ul className="list-group">
                {
                    genres.map((genre, i) => {
                        return <li className={selectedGenre === genre ? 'list-group-item active' : 'list-group-item'}
                            key={genre[id]}
                            onClick={() => onItemSelect(genre)}
                            >{genre[textProperty]}
                        </li>
                    })
                }
            </ul>
        </React.Fragment>
    );

}
Listgroup.defaultProps = {
    id: '_id',
    textProperty: 'name'
}

export default Listgroup;
