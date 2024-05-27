sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        openSpreadsheetUpload: async function (event) {
            this.getView().setBusyIndicatorDelay(0);
            this.getView().setBusy(true);
            this.spreadsheetUpload = await this.getView()
              .getController()
              .getOwnerComponent()
              .createComponent({
                usage: "spreadsheetImporter",
                async: true,
                componentData: {
                  context: this,
                },
              });
            // Fired when the Upload button is pressed, possible to prevent data from being sent to the backend
			this.spreadsheetUpload.attachUploadButtonPress(function (oEvent) {
				//event.preventDefault();
				 // Prevent data from being sent to the backend
				 oEvent.preventDefault();
				let oRVOPayload = oEvent.getParameters().payload;
                // this.submit();
				MessageToast.show("Event attachUploadButtonPress")
			}, this);
            this.spreadsheetUpload.openSpreadsheetUploadDialog();
            this.getView().setBusy(false);
          },
          submit: async function () {
            //   const type = "OrdersService.Orders";
            //   const payload = {
            //       OrderNo: "3",
            //       buyer: "test@test.de"
            //   };
              const model = this.getView().getModel();
              const binding = this.byId("ui.v2.ordersv2fe::sap.suite.ui.generic.template.ListReport.view.ListReport::Orders--responsiveTable").getBinding("items");
              const context = binding.create(payload, /*bAtEnd*/ true, { inactive: false, expand: "" });
              // const context2 = binding.create(payload);
              await model.submitChanges();
              await context.created();
              // await context2.created();
  
              const draftController = new sap.ui.generic.app.transaction.DraftController(model);
              await draftController.activateDraftEntity(context, true);
              binding.refresh();
  
              // const operation = context.getModel().bindContext("OrdersService.draftActivate" + "(...)", context, { $$inheritExpandSelect: true });
              // const operation2 = context2.getModel().bindContext("OrdersService.draftActivate" + "(...)", context2, { $$inheritExpandSelect: true });
              // operation.execute("$auto", false, null, /*bReplaceWithRVC*/ true);
              // operation2.execute("$auto", false, null, /*bReplaceWithRVC*/ true);
              console.log(context);
          }
          

    };
});