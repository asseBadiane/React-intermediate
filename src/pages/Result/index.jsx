import { useContext } from "react"
import { SurveyContext } from "../../utils/style/context"

function Result() {
    const { answers } = useContext(SurveyContext)
    console.log(answers)
    return (
        <div>
            <h1>Les Résultats</h1>
        </div>
    )
}

export default Result