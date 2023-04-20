import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/yonce.css'
//代码高亮
import 'codemirror/addon/selection/active-line';

// 代码折叠
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';

//代码滚动
import 'codemirror/addon/scroll/simplescrollbars.js'
import 'codemirror/addon/scroll/simplescrollbars.css'
import { useState } from 'react';

const Page = () =>
{
  const [data, setData] = useState('')
  return (
    <CodeMirror
      value={data}
      options={{
        lineNumbers: true, //显示行号
        mode: { name: 'text/x-java' },//语言
        autofocus: true,//自动获取焦点
        styleActiveLine: true,//光标代码高亮
        theme: 'yonce',  //主题
        scrollbarStyle: 'overlay',
        lineWrapping: false, //代码自动换行
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirrorfoldgutter'],//end
      }}
    />
  )
}

export default Page;
