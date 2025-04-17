import banner from "../../assets/banner/image.png"

export const Banner = () => {
    return (
        <div className="banner">
            <img style={{
                width: '100%',
                height: 'auto',
                maxHeight: '466px',
            }} alt="Banner" src={banner} />
        </div>
    )
}