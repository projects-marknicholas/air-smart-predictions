import Weather from '../component/weather'

function Navbar(){
  return(
    <>
      <div className='overview-dash'>
        <div className='over-left'>
          <div className='overview-profile'>
            {/* <img src alt="logo"/> */}
            <span>
              <h1>Air Quality</h1>
              <p>Description</p>
            </span>
          </div>
        </div>
        <div className='over-right'>
          <Weather/>
        </div>
      </div>
    </>
  );
}

export default Navbar;