import { useState } from "react"
import styled from "styled-components"

export default function Habit() {
    const [habitName, setHabitName] = useState("")
    return (
        <StyledHabit>
            <input 
                required
                placeholder="nome do hábito"
                onChange={(e) => setHabitName(e)}
            />
            <WeekDays>
                <div>D</div>
                <div>S</div>
                <div>T</div>
                <div>Q</div>
                <div>Q</div>
                <div>S</div>
                <div>S</div>
            </WeekDays>
            <button>Cancelar</button>
            <button>Salvar</button>
        </StyledHabit>
    )
}
const StyledHabit = styled.div `
    padding: 18px;
    margin: 0 18px;
    background-color: white;
`
const WeekDays = styled.div `

`