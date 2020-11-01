import './index.scss';

//Ordena os filhos de acordo com os headings
function OrderItemByKey(element, heading){
    return heading.reduce((acc, h)=>{
        //se ligou né?
        const transformed = h.transform ? h.transform( element[ h.key ] ) : null
        const content = h.content ? h.content( element ) : transformed || element[ h.key ]

       /* console.log(
            h, transformed
        )*/

        if( content ){
            acc.push(
                <div className="table-body-td" key={h.key}>
                    { content }
                </div>
            )
        }
        return acc
    }, [])
}

function Table({ heading, content }) {
  return (
    <div className="table-container">
        <div className="table-head">
            {
                heading && heading.map((h)=>( <div className="table-head-td" key={h.key}>{ h.text }</div>))
            }
        </div>
        <div className="table-body">
            {
              content && content.map(
              (c)=>(<div className="tr">{ OrderItemByKey(c, heading) }</div>)
              )
            }
        </div>
    </div>
  );
}

export default Table;
