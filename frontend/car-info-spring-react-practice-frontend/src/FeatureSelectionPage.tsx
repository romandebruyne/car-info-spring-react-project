import { useState } from "react";

type Props = { onSelect: (type: string) => void };

export function FeatureSelectionPage(props: Props) {
    const allFeatures = ["model", "brand", "engineType", "modelFamily", "carBodyType", "segment"];
    const [feature, setFeature] = useState("model");

    return (
        <div>
            <h2>Feature Selection</h2>
            <p>Click on feature and submit decision via click on button.</p>
            <ul>
                { allFeatures.map((feature) => (
                    <li onClick={ () => setFeature(feature) }>{ feature }</li>
                ))}
            </ul>
            
            <button onClick={ () => props.onSelect(feature) }>Select feature: { feature }</button>
        </div>
    )
}