const handleScroll = (event: any, setCurrentSection: any, planetsData: any) => {
    const delta = Math.sign((event as WheelEvent).deltaY);
    setCurrentSection((prevSection: any) => {
        const nextSection = prevSection + delta;

        // Empêcher le défilement au-delà du début
        if (nextSection < 0) {
            return prevSection; // Garde la section actuelle si elle est déjà au minimum
        }
        // Empêcher le défilement au-delà de la fin
        else if (nextSection >= planetsData.length + 1) { // +1 pour la vue d'ensemble
            return prevSection; // Garde la section actuelle si elle est déjà au maximum
        }

        return nextSection; // Mise à jour de la section seulement si dans les limites
    });
};

export default handleScroll;