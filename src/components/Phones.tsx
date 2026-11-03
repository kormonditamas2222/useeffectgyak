import { useEffect, useState } from "react";

interface Phone {
    id: number;
    nev: string;
    gyarto: string;
    ar: number;
    memoria: number;
}

export function Phones() {
    const [phones, setPhones] = useState<Phone[]>([]);
    //const [loadState, setLoadState] = useState();
    const [novekvo, setNovekvo] = useState(true);
    useEffect(() => {
        async function load() {
            try {
                const response = await fetch("/phones.json");
                if (!response.ok) {
                    throw new Error("Hiba a beltöltésnél")
                }
                const data = await response.json() as Phone[];
                setPhones(data);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(error)
                }
            }
        }
        load();
    }, [])
    const sortedPhones = [...phones].sort((a, b) => novekvo ? a.ar - b.ar : b.ar - a.ar);
    return (
        <>
            <h2>Telefonlista</h2>
            <table>
                <thead>
                    <tr>
                        <th>Név</th>
                        <th>Gyártó</th>
                        <th>Ár</th>
                        <th>Memória</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedPhones.map(item => (
                        <tr key={item.id}>
                            <td>{item.nev}</td>
                            <td>{item.gyarto}</td>
                            <td>{item.ar} Ft</td>
                            <td>{item.memoria} GB</td>
                        </tr>
                    ))}
                </tbody>

            </table>
            <button onClick={() => setNovekvo(jelenlegi => !jelenlegi)}>Sorrend beállítása</button>
        </>
    )
}