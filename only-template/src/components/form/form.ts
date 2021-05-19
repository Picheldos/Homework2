import Component, {ComponentProps, getComponent, getComponents} from '../../app/js/component';
import Input, {valid} from "../input/input";
import FormButton from "../form-button/form-button";

export default class Form extends Component.Default {
    inputs: Input[];
    FormButton: FormButton;

    constructor(element: ComponentProps) {
        super(element);
        this.inputs = getComponents('input', this.nRoot).map(component => new Input(component, this.updateButton));
        this.FormButton = new FormButton(getComponent('form-button', this.nRoot))
        this.nRoot.addEventListener('submit', this.onSubmit);
    }

    updateButton = () => {
        if (valid == true) {
            this.FormButton.changeButton(
                this.inputs.every(item => {
                    if (item.required) return item.getValue()
                    return true;
                }));
            } else {
            this.FormButton.changeButton(false);
        }
    }

    onSubmit = (e: Event) => {
        e.preventDefault();

        let data: any = {};

        this.inputs.forEach(item => {
            data[item.name] = item.getValue();
        });

        console.log(data)
    }


    destroy = () => {
        // Destroy functions
    }
}