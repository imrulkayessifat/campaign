export type JSONTemplate = {
    counters: {
      u_column: number;
      u_row: number;
      u_content_divider: number;
      u_content_button: number;
    };
    body: {
      id: string;
      rows: {
        id: string;
        cells: number[];
        columns: {
          id: string;
          contents: {
            id: string;
            type: string;
            values: {
              width: string;
              border: {
                borderTopWidth: string;
                borderTopStyle: string;
                borderTopColor: string;
              };
              textAlign: string;
              containerPadding: string;
              anchor: string;
              hideDesktop: boolean;
              displayCondition: null | any; 
              _meta: {
                htmlID: string;
                htmlClassNames: string;
              };
              selectable: boolean;
              draggable: boolean;
              duplicatable: boolean;
              deletable: boolean;
              hideable: boolean;
            };
            
          }[];
          values: {
            
          };
        }[];
        values: {
          displayCondition: null | any; 
          columns: boolean;
          backgroundColor: string;
          columnsBackgroundColor: string;
          backgroundImage: {
            url: string;
            fullWidth: boolean;
            repeat: string;
            size: string;
            position: string;
          };
          padding: string;
          anchor: string;
          hideDesktop: boolean;
          _meta: {
            htmlID: string;
            htmlClassNames: string;
          };
          selectable: boolean;
          draggable: boolean;
          duplicatable: boolean;
          deletable: boolean;
          hideable: boolean;
        };
      }[];
      headers: any[]; 
      footers: any[]; 
      values: {
        popupPosition: string;
        popupWidth: string;
        popupHeight: string;
        borderRadius: string;
        contentAlign: string;
        contentVerticalAlign: string;
        contentWidth: string;
        fontFamily: {
          label: string;
          value: string;
        };
        textColor: string;
        popupBackgroundColor: string;
        popupBackgroundImage: {
          url: string;
          fullWidth: boolean;
          repeat: string;
          size: string;
          position: string;
        };
        popupOverlay_backgroundColor: string;
        popupCloseButton_position: string;
        popupCloseButton_backgroundColor: string;
        popupCloseButton_iconColor: string;
        popupCloseButton_borderRadius: string;
        popupCloseButton_margin: string;
        popupCloseButton_action: {
          name: string;
          attrs: {
            onClick: string;
          };
        };
        backgroundColor: string;
        backgroundImage: {
          url: string;
          fullWidth: boolean;
          repeat: string;
          size: string;
          position: string;
        };
        preheaderText: string;
        linkStyle: {
          body: boolean;
          linkColor: string;
          linkHoverColor: string;
          linkUnderline: boolean;
          linkHoverUnderline: boolean;
        };
        _meta: {
          htmlID: string;
          htmlClassNames: string;
        };
      };
    };
    schemaVersion: number;
  };