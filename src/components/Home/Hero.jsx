import { Link } from 'react-router-dom'
import TextLoop from 'react-text-loop'
import heroSvg from './hero-svg.svg'
import useWindowDimensions from '../hooks/useWindowDimensions'

const Hero = () => {
  let descHeader = 'retirement strategy'
  const { height, width } = useWindowDimensions()

  return (
    <div className='hero-section'>
      <div className='hero-desc'>
        <div>
          <div className='desc-header'>
            <strong>
              Plan your <br />
              {width > 1000 ? (
                <>
                  <TextLoop
                    className='cycle-text'
                    interval={5000}
                    children={[
                      'financial independence',
                      'retirement strategy',
                      'home purchases',
                      'future portfolio',
                      'real estate investments',
                      'early retirement',
                    ]}
                  />
                </>
              ) : (
                'financial future'
              )}
            </strong>
          </div>
          <div className='desc-text'>
            Spark's portfolio dashboard lets you look to the future and make more informed decisions
            about your finances.
          </div>
        </div>
        <div className='desc-buttons'>
          <Link className='portfolio-button' to='/portfolio'>
            Try Spark
          </Link>
          {/* <Link className="how-link" to="/">
            How it works
          </Link> */}
        </div>
        <img src={heroSvg} className='hero-svg' />
      </div>
    </div>
  )
}

export default Hero
