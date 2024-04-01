import Manucard from './Manucard';
import recognition_icon from './assets/recognition.png'
import learn_icon from './assets/learn.png'
import stat_icon from './assets/stat.png'

const Home = () => {
    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <Manucard
                imageSrc={recognition_icon}
                title="Translation"
                description="What do you want?"
                to="/prediction"
            />
            <Manucard
                imageSrc={learn_icon}
                title="Learn"
                description="Start communicating with Sign Language now!"
                to="/learning"
            />
            <Manucard
                imageSrc={stat_icon}
                title="Stat"
                description="Do you remember how many signs have you mastered in your life?"
                to="/recognition"
            />
        </div>
    );
}

export default Home;