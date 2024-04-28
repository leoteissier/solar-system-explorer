const handleTextureLoaded = (index: number, loadStates: boolean[], setLoadStates: (loadStates: boolean[]) => void, setLoaded: (loaded: boolean) => void) => {
    const newLoadStates = [...loadStates];
    newLoadStates[index] = true;
    setLoadStates(newLoadStates);

    // Check if all textures are loaded
    if (newLoadStates.every(state => state)) {
        setTimeout(() => setLoaded(true), 300);  // Using setTimeout to ensure all are truly loaded
    }
};


export default handleTextureLoaded;