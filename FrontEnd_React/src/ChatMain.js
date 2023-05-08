import React,{Component} from "react";
import io from 'socket.io-client'
const socket=io.connect('http://localhost:3001')
class ChatMain extends Component{
    constructor(props) {
        super(props);
        // 서버에서 전송하는 데이터를 저장
        this.state={
            logs:[]
        }
    }

    // 서버에서 들어오는 값을 받는다
    componentDidMount() {
        socket.on('chat-msg',(obj)=>{
            const log2=this.state.logs;
            log2.push(obj)
            this.setState({logs:log2}) //갱신명령
        })
    }
    // 받아서 갱신
    render() {
        const html=this.state.logs.map((m)=>
            <div className={"message-right"}>
                <div className={"message-text"}>{m.message}</div>
            </div>
        )
        return (
            <div id={"chat_container"}>
                <div id={"chat"} className={"active"}>
                    <header><h1>Chat</h1></header>
                    <section className={"content"}>
                        <div className={"message_content"}>
                            {html}
                        </div>
                    </section>
                    <ChatForm />
                </div>
            </div>
        )
    }
}
class ChatForm extends Component{
    constructor(props) {
        super(props);
        this.state={
            message:''
        }
    }
    // 문자를 입력시마다 입력값을 저장
    messageChange(e)
    {
        this.setState({message:e.target.value})
    }
    // 저장된 문자를 서버로 전송
    send(e)
    {
        if(e.key=='Enter')
        {
            e.preventDefault();// 이벤트 종료
            socket.emit('chat-msg',{
                message:this.state.message
            })
            this.setState({message:''})
            //this.state.message='';
        }
    }
    render(){
        return (
            <form>
                <input type={"text"} id={"input_chat"} value={this.state.message}
                       onChange={this.messageChange.bind(this)}
                       onKeyPress={this.send.bind(this)}
                />
            </form>
        )
    }
}

export default ChatMain