function Button(props) {

    // function onValidate() {
    //     alert('bravo');
    // }

    return (
        <div>
            {props.onClick ?
                <button
                    className={"btn " + props.className}
                    type="button"
                    // onClick={onValidate}
                    onClick={props.onClick}
                >
                    {props.name || "Click me"} {props.yelling && "!!!"}
                </button>
                :
                <a
                    href={props.link}
                    className={"btn " + (props.className || "btn-primary")}
                    target="_blank"
                >
                    {props.name || "Click me"}
                </a>
            }
        </div>
    );

}

export default Button;