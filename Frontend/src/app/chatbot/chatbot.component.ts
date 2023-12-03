import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatbotService } from '../chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollable_parent') private scrollContainer?: ElementRef;

  botBox: boolean = false;
  loading: boolean = false;
  user:string = '';
  conversation: any = [];

  constructor(private chatBotService:ChatbotService){}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }

  ngOnInit(): void {
    this.conversation = [{gpt:'Hi, How can I assist You Today?'}];
  }

  check(gpt:any){
    if(gpt && typeof gpt=== 'string'){
      return 'string';
    }else if(gpt && Array.isArray(gpt) && gpt.length>0){
      return 'array'
    }else if(gpt && Array.isArray(gpt) && gpt.length===0){
      return 'empty'
    }else{
      return undefined
    }
  }

  onOpen(){
    this.botBox = true;
  }

  onClose(){
    this.botBox = false;
    this.conversation = [{gpt:'Hi, How can I assist You ?'}];
  }

  onWrite(e:Event){
    this.user = (e.target as HTMLInputElement).value
  }

  onPress(event:KeyboardEvent){
    if(event.key==='Enter'){
      if(this.user==='' || this.loading){
        
      }else{
        this.onSend()
      }
    }
  }

  onSend(){
    if(this.user==='' || this.loading){
      
    }else{
      const arr = this.conversation;
      arr.push({user:this.user})
      this.conversation = arr;

      this.loading = true;

      this.chatBotService.getResponse(this.user).subscribe((data:{msg:String | Array<any> })=>{
        this.loading = false;
        const arr = this.conversation;
        arr.push({gpt:data.msg})
        this.conversation = arr;
        this.user = ''

      },(error)=>{
        this.loading = false;
        const arr = this.conversation;
        arr.push({gpt:'Something went wrong, Try again please!!'})
        this.conversation = arr;
        this.user = ''
      })
    }
  }
}
