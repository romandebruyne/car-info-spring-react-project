import { useEffect, useState } from "react";
import { getCarById } from "./api";
import { Credentials } from "./Credentials";
import "./SimpleTable.css";

type Props = { creds: Credentials; carId: number; onBack: () => void };

export function CarDataPage(props: Props) {
    const [id, setId] = useState(0);
    const [model, setModel] = useState("");
    const [modelFamily, setModelFamily] = useState("");
    const [modelType, setModelType] = useState("");
    const [modelYear, setModelYear] = useState(0);
    const [modelStatus, setModelStatus] = useState("");
    const [brand, setBrand] = useState("");
    const [indicator, setIndicator] = useState("");
    const [launchDate, setLaunchDate] = useState("");
    const [developmentType, setDevelopmentType] = useState("");
    const [segment, setSegment] = useState("");
    const [carBodyType, setCarBodyType] = useState("");
    const [carBodySpecification, setCarBodySpecification] = useState("");
    const [engineType, setEngineType] = useState("");
    const [carProject, setCarProject] = useState("");
    const [limitation, setLimitation] = useState("");
    const [uuid, setUuid] = useState("");
    const [sisterModelOne, setSisterModelOne] = useState("");
    const [sisterModelTwo, setSisterModelTwo] = useState("");
    const [baseCar, setBaseCar] = useState("");

    useEffect(() => {
        getCarById(props.creds, props.carId).then(body => {
            if (body.data) {
                setId(body.data.id);
                setModel(body.data.model);
                setModelFamily(body.data.modelFamily);
                setModelType(body.data.modelType);
                setModelYear(body.data.modelYear);
                setModelStatus(body.data.model);
                setBrand(body.data.brand);
                setIndicator(body.data.indicator);
                setLaunchDate(body.data.launchDate);
                setDevelopmentType(body.data.developmentType);
                setSegment(body.data.segment);
                setCarBodyType(body.data.carBodyType);
                setCarBodySpecification(body.data.carBodySpecification);
                setEngineType(body.data.engineType);
                setCarProject(body.data.carProject);
                setLimitation(body.data.limitation);
                setUuid(body.data.uuid);
                setSisterModelOne(body.data.sisterModelOne);
                setSisterModelTwo(body.data.sisterModelTwo);
                setBaseCar(body.data.baseCar);
            }
        })
    }, [])

    return (
        <>
            <h2>Car data</h2>
            <table className="simpletable">
                <tr>
                    <th>Category</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Id</td>
                    <td>{ id }</td>
                </tr>       
                <tr>
                    <td>Model</td>
                    <td>{ model }</td>
                </tr>             
                <tr>
                    <td>Model Family</td>
                    <td>{ modelFamily }</td>
                </tr>       
                <tr>
                    <td>Model Type</td>
                    <td>{ modelType }</td>
                </tr>       
                <tr>
                    <td>Model Year</td>
                    <td>{ modelYear }</td>
                </tr>       
                <tr>
                    <td>Model Status</td>
                    <td>{ modelStatus }</td>
                </tr> 
                <tr>
                    <td>Brand</td>
                    <td>{ brand }</td>
                </tr>       
                <tr>
                    <td>Indicator</td>
                    <td>{ indicator }</td>
                </tr>       
                <tr>
                    <td>Launch Date</td>
                    <td>{ launchDate }</td>
                </tr>       
                <tr>
                    <td>Development Type</td>
                    <td>{ developmentType }</td>
                </tr>       
                <tr>
                    <td>Area Code</td>
                    <td>{ segment }</td>
                </tr>       
                <tr>
                    <td>Car Body Type</td>
                    <td>{ carBodyType }</td>
                </tr>       
                <tr>
                    <td>Car Body Spec.</td>
                    <td>{ carBodySpecification }</td>
                </tr>       
                <tr>
                    <td>EngineType</td>
                    <td>{ engineType }</td>
                </tr>       
                <tr>
                    <td>Car Project</td>
                    <td>{ carProject }</td>
                </tr>       
                <tr>
                    <td>Limitation</td>
                    <td>{ limitation }</td>
                </tr>       
                <tr>
                    <td>UUID</td>
                    <td>{ uuid }</td>
                </tr>       
                <tr>
                    <td>Sister Model #1</td>
                    <td>{ sisterModelOne }</td>
                </tr>       
                <tr>
                    <td>Sister Model #2</td>
                    <td>{ sisterModelTwo }</td>
                </tr>       
                <tr>
                    <td>Base Car</td>
                    <td>{ baseCar }</td>
                </tr>       
            </table>

            <button onClick= { props.onBack }>Back</button>
        </>
    )

}