import { FC, FormEventHandler, useState } from "react";

type StepsForm = {
    date: string,
    quantity: number
}

export const SetSteps: FC = () => {
    const [form, setForm] = useState<StepsForm[]>([]);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        
        const newDayResult: StepsForm = {
            date: e.currentTarget.date.value,
            quantity: Number(e.currentTarget.quantity.value)
        }
        
        setForm( prevForm => {
            const dayIndex = prevForm.findIndex( elem => elem.date === newDayResult.date );

            if ( dayIndex > -1 ) {
                newDayResult.quantity += prevForm[dayIndex].quantity;
                prevForm.splice(dayIndex, 1);
            }

            const target = e.target as HTMLFormElement;
            target.reset();

            return prevForm.concat(newDayResult);
        } );
    }

    const formatDate = (date: string) => {
        const convertedDate = new Date(date);
        const dd = convertedDate.getDate() < 10 ? "0" + convertedDate.getDate() : convertedDate.getDate();
        const mm = convertedDate.getMonth() < 10 ? "0" + (convertedDate.getMonth() + 1) : convertedDate.getMonth() + 1;
        const yyyy = convertedDate.getFullYear();
        
        return `${dd}.${mm}.${yyyy}`;
    }
    
    const sortedListResults = form.sort( (a, b) => Number(new Date(b.date)) - Number(new Date(a.date)) );
    
    const deleteDayResult = (id: string) => {
        setForm( prevForm => prevForm.filter( (elem) => elem.date !== id ));
    }
    
    return (
        <div className="form-steps-results">
            <form onSubmit={handleSubmit} className="steps-form">
                <div className="date-block">
                    <label className="date-field-name">
                        Дата (ДД.ММ.ГГ)
                        <input 
                            name="date"
                            className="date-field-input input" 
                            type="date"
                            required />
                    </label>    
                </div>
                <div className="steps-block">
                    <label className="steps-field-name">
                        Пройдено км
                        <input
                            name="quantity"
                            className="steps-field-quantity-input input"
                            required />  
                    </label>
                </div>
                <button type="submit" className="btn-submit input">Ok</button>
            </form>
            <div className="steps-results">
                <ul className="results-name">
                    <li>Дата (ДД.ММ.ГГ)</li>
                    <li>Пройдено км</li>
                    <li>Действия</li>
                </ul>
                <div className="results-list">
                    {sortedListResults.map( (elem) => {
                        return (
                            <ul className="results-list-items"  key={elem.date}>
                                <li className="results-item">{formatDate(elem.date)}</li>
                                <li className="results-item">{elem.quantity}</li>
                                <li className="results-item">
                                    <button className="btn-change btns">✎</button>
                                    <button className="btn-delete btns" onClick={() => deleteDayResult(elem.date)}>✘</button>
                                </li>
                            </ul>                              
                        )
                    } )}
                </div>
            </div>
        </div>
    )
}