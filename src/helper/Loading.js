import { ThreeDots } from 'react-loader-spinner'

const Loading = ({loading}) => {

    const mystyle = {
        height: '100vh',
        width: '100%',
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#0000005e',
        margin: '0 auto',

    };

  return (
    <div style={mystyle}>
        <ThreeDots height="80" width="80" color="#405189" ariaLabel="three-dots-loading" visible={loading} />
    </div>
  )
}

export default Loading