import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { DetailsList, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import UserService from "./services/UserService";

export interface IDetailsListCustomColumnsExampleState {
  sortedItems: [];
  columns: IColumn[];
}

export class App extends React.Component<{}, IDetailsListCustomColumnsExampleState> {
  constructor(props: {}) {
    super(props);

    //const items = createListItems(500);
    this.state = {
      sortedItems: [],
      columns: _buildColumns(),
    };

    
  }

  public render() {
    const { sortedItems, columns } = this.state;

    return (
      <DetailsList
        items={sortedItems}
        setKey="set"
        columns={columns}
        onRenderItemColumn={_renderItemColumn}
        onColumnHeaderClick={this._onColumnClick}
        onItemInvoked={this._onItemInvoked}
        onColumnHeaderContextMenu={this._onColumnHeaderContextMenu}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="Row checkbox"
      />
    );
  }

  componentDidMount(){
    UserService.get()
    .then(response => response.data)
    .then((data) => {
      this.setState({sortedItems: data});  
    });
  }

  private _onColumnClick = (event: React.MouseEvent<HTMLElement> | undefined,
   column: IColumn | undefined): void => {

    if (!column) return;
    const { columns } = this.state;
    let { sortedItems } = this.state;
    let isSortedDescending = column.isSortedDescending;

    // If we've sorted this column, flip it.
    if (column.isSorted) {
      isSortedDescending = !isSortedDescending;
    }

    // Sort the items.
    sortedItems = _copyAndSort(sortedItems, column.fieldName!, isSortedDescending);

    // Reset the items and columns to match the state.
    this.setState({
      sortedItems: sortedItems,
      columns: columns.map(col => {
        col.isSorted = col.key === column.key;

        if (col.isSorted) {
          col.isSortedDescending = isSortedDescending;
        }

        return col;
      }),
    });
  };

  private _onColumnHeaderContextMenu(column: IColumn | undefined, ev: React.MouseEvent<HTMLElement> | undefined): void {
    console.log(`column ${column!.key} contextmenu opened.`);
  }

  private _onItemInvoked(item: any, index: number | undefined): void {
    alert(`Item ${item.name} at index ${index} has been invoked.`);
  }
}

function _buildColumns(): IColumn[] {

  const columns= [
      { key: 'thumbnail', name: '', fieldName: 'thumbnail', minWidth: 100, maxWidth: 50, isResizable: true, ariaLabel : 'Thumbnail' },
      { key: 'user_type_string', name: 'Tipo de usuario', fieldName: 'user_type_string', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'last_name', name: 'Apellido', fieldName: 'last_name', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'first_name', name: 'Nombre', fieldName: 'first_name', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'mobile', name: 'Número de celular', fieldName: 'mobile', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'identification_photo', name: '¿Cuenta con imagen del DNI?', fieldName: 'identification_photo', minWidth: 100, maxWidth: 500, isResizable: true },
      { key: 'address_photo', name: '¿Cuenta con imagen de la dirección?', fieldName: 'address_photo', minWidth: 100, maxWidth: 500, isResizable: true },
      { key: 'certificate_photo', name: '¿Cuenta con imagen del certificado de antecedentes?', fieldName: 'certificate_photo', minWidth: 100, maxWidth: 500, isResizable: true },
    ];

  return columns;
}

function _renderItemColumn(item: any, index: number 
  | undefined, column: IColumn | undefined) {
  if (!column) return;
  const fieldContent = item[column.fieldName as string];

  switch (column.key) {
    case 'thumbnail':
      return <Image src={fieldContent} width={50} height={50} imageFit={ImageFit.cover} onError={addDefaultSrc}/>;
    case 'identification_photo':
      return <span>{fieldContent ? 'Si' : 'No'}</span>;
    case 'address_photo':
    return <span>{fieldContent ? 'Si' : 'No'}</span>;
    case 'certificate_photo':
    return <span>{fieldContent ? 'Si' : 'No'}</span>;
    default:
      return <span>{fieldContent}</span>;
  }
}

function _copyAndSort<T>(items: any, columnKey: string, isSortedDescending?: boolean): any {
  const key = columnKey as string;
  return items.slice(0).sort((a : any, b : any) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
}

function addDefaultSrc(ev: any){
  ev.target.src = 'https://appserver.mercurio-b2b.net/web/img/default.png';
}

export default App;