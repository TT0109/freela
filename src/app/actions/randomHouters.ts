export const displayTime = async () => {
    const randomMinutes = Math.floor(Math.random() * 24 * 60); // 0 a 1439 minutos
    const displayTime = randomMinutes >= 60 
        ? `${Math.floor(randomMinutes / 60)} h` 
        : `${randomMinutes} min`;
    return displayTime;
}